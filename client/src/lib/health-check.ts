
export interface HealthStatus {
  overall: 'healthy' | 'warning' | 'critical';
  effects: {
    status: 'ok' | 'partial' | 'failed';
    loaded: number;
    total: number;
    errors: string[];
  };
  canvas: {
    status: 'ok' | 'failed';
    initialized: boolean;
  };
  performance: {
    status: 'good' | 'degraded' | 'poor';
    lastRenderTime: number;
  };
}

export class HealthChecker {
  private static instance: HealthChecker;
  private status: HealthStatus = {
    overall: 'healthy',
    effects: { status: 'ok', loaded: 0, total: 0, errors: [] },
    canvas: { status: 'ok', initialized: false },
    performance: { status: 'good', lastRenderTime: 0 }
  };

  static getInstance(): HealthChecker {
    if (!HealthChecker.instance) {
      HealthChecker.instance = new HealthChecker();
    }
    return HealthChecker.instance;
  }

  updateEffectsStatus(loaded: number, total: number, errors: string[] = []) {
    this.status.effects = {
      status: errors.length === 0 ? 'ok' : errors.length < total / 2 ? 'partial' : 'failed',
      loaded,
      total,
      errors
    };
    this.updateOverallStatus();
  }

  updateCanvasStatus(initialized: boolean) {
    this.status.canvas = {
      status: initialized ? 'ok' : 'failed',
      initialized
    };
    this.updateOverallStatus();
  }

  updatePerformanceStatus(renderTime: number) {
    this.status.performance = {
      status: renderTime < 16 ? 'good' : renderTime < 33 ? 'degraded' : 'poor',
      lastRenderTime: renderTime
    };
    this.updateOverallStatus();
  }

  private updateOverallStatus() {
    const hasFailures = this.status.effects.status === 'failed' || 
                       this.status.canvas.status === 'failed';
    const hasWarnings = this.status.effects.status === 'partial' || 
                       this.status.performance.status === 'poor';

    if (hasFailures) {
      this.status.overall = 'critical';
    } else if (hasWarnings) {
      this.status.overall = 'warning';
    } else {
      this.status.overall = 'healthy';
    }
  }

  getStatus(): HealthStatus {
    return { ...this.status };
  }

  logStatus() {
    const status = this.getStatus();
    console.log(`🏥 Health Check - Overall: ${status.overall.toUpperCase()}`);
    console.log(`   Effects: ${status.effects.loaded}/${status.effects.total} loaded (${status.effects.status})`);
    console.log(`   Canvas: ${status.canvas.status} (initialized: ${status.canvas.initialized})`);
    console.log(`   Performance: ${status.performance.status} (last render: ${status.performance.lastRenderTime}ms)`);
    
    if (status.effects.errors.length > 0) {
      console.warn(`   Effect errors:`, status.effects.errors);
    }
  }
}
