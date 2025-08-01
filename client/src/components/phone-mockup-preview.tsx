
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Instagram, MessageCircle, RotateCcw, Maximize2 } from 'lucide-react';

interface PhoneMockupPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  mainText: string;
  secondaryText: string;
  logoPreview: string;
  telephone: string;
  boutique: string;
  selectedFormat: string;
  onWhatsAppContact: () => void;
}

const PHONE_FORMATS = {
  'iphone': {
    width: 375,
    height: 812,
    name: 'iPhone 15 Pro',
    borderRadius: '55px',
    notch: true,
    statusBarHeight: 44,
    homeIndicator: true,
    bezels: { top: 8, bottom: 8, left: 8, right: 8 }
  },
  'android': {
    width: 393,
    height: 851,
    name: 'Samsung Galaxy S24',
    borderRadius: '32px',
    notch: false,
    statusBarHeight: 32,
    homeIndicator: false,
    bezels: { top: 6, bottom: 6, left: 6, right: 6 }
  },
  'pixel': {
    width: 412,
    height: 892,
    name: 'Google Pixel 8',
    borderRadius: '28px',
    notch: false,
    statusBarHeight: 36,
    homeIndicator: false,
    bezels: { top: 4, bottom: 4, left: 4, right: 4 }
  }
};

const NETWORK_SIMULATIONS = {
  whatsapp: {
    name: 'WhatsApp Status',
    backgroundColor: '#128C7E',
    statusBar: '#075E54',
    icon: MessageCircle,
    brandColor: '#25D366',
    header: {
      title: 'Mon statut',
      time: 'Maintenant',
      avatar: true
    },
    overlay: 'whatsapp-ui'
  },
  instagram: {
    name: 'Instagram Story',
    backgroundColor: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    statusBar: 'transparent',
    icon: Instagram,
    brandColor: '#E4405F',
    header: {
      title: 'Votre story',
      time: 'Il y a 2 min',
      avatar: true
    },
    overlay: 'instagram-ui'
  },
  tiktok: {
    name: 'TikTok Video',
    backgroundColor: '#000000',
    statusBar: 'transparent',
    icon: Smartphone,
    brandColor: '#FF0050',
    header: {
      title: 'Pour vous',
      time: 'En direct',
      avatar: false
    },
    overlay: 'tiktok-ui'
  },
  facebook: {
    name: 'Facebook Story',
    backgroundColor: '#1877F2',
    statusBar: '#1565C0',
    icon: MessageCircle,
    brandColor: '#1877F2',
    header: {
      title: 'Votre story',
      time: 'Il y a 1 min',
      avatar: true
    },
    overlay: 'facebook-ui'
  },
  youtube: {
    name: 'YouTube Shorts',
    backgroundColor: '#000000',
    statusBar: 'transparent',
    icon: Smartphone,
    brandColor: '#FF0000',
    header: {
      title: 'Shorts',
      time: 'En cours',
      avatar: false
    },
    overlay: 'youtube-ui'
  },
  linkedin: {
    name: 'LinkedIn Story',
    backgroundColor: '#0077B5',
    statusBar: '#005885',
    icon: MessageCircle,
    brandColor: '#0077B5',
    header: {
      title: 'Votre story',
      time: 'Il y a 3 min',
      avatar: true
    },
    overlay: 'linkedin-ui'
  }
};

export function PhoneMockupPreview({
  canvasRef,
  mainText,
  secondaryText,
  logoPreview,
  telephone,
  boutique,
  selectedFormat,
  onWhatsAppContact
}: PhoneMockupPreviewProps) {
  const [selectedPhone, setSelectedPhone] = useState<keyof typeof PHONE_FORMATS>('iphone');
  const [selectedNetwork, setSelectedNetwork] = useState<keyof typeof NETWORK_SIMULATIONS>('whatsapp');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const phoneConfig = PHONE_FORMATS[selectedPhone];
  const networkConfig = NETWORK_SIMULATIONS[selectedNetwork];
  const NetworkIcon = networkConfig.icon;

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getBatteryLevel = () => {
    return Math.floor(Math.random() * 40) + 60; // 60-100%
  };

  const getSignalBars = () => {
    return Math.floor(Math.random() * 2) + 3; // 3-4 bars
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-3">
          {/* Sélecteur de téléphone */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">📱 Appareil:</span>
            <Tabs value={selectedPhone} onValueChange={(value) => setSelectedPhone(value as keyof typeof PHONE_FORMATS)}>
              <TabsList className="bg-slate-800 h-8">
                <TabsTrigger value="iphone" className="text-xs px-3" title="iPhone">🍎</TabsTrigger>
                <TabsTrigger value="android" className="text-xs px-3" title="Samsung">🤖</TabsTrigger>
                <TabsTrigger value="pixel" className="text-xs px-3" title="Pixel">🔍</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Sélecteur de plateforme */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">🌐 Plateforme:</span>
            <Tabs value={selectedNetwork} onValueChange={(value) => setSelectedNetwork(value as keyof typeof NETWORK_SIMULATIONS)}>
              <TabsList className="bg-slate-800 h-8">
                <TabsTrigger value="whatsapp" className="text-xs px-2" title="WhatsApp">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </TabsTrigger>
                <TabsTrigger value="instagram" className="text-xs px-2" title="Instagram">
                  <Instagram className="w-4 h-4 text-pink-500" />
                </TabsTrigger>
                <TabsTrigger value="tiktok" className="text-xs px-2" title="TikTok">
                  🎵
                </TabsTrigger>
                <TabsTrigger value="facebook" className="text-xs px-2" title="Facebook">
                  📘
                </TabsTrigger>
                <TabsTrigger value="youtube" className="text-xs px-2" title="YouTube">
                  📺
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="text-xs px-2" title="LinkedIn">
                  💼
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsFullscreen(!isFullscreen)}
            variant="outline"
            size="sm"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Badge variant="outline" className="text-xs">
            {phoneConfig.name}
          </Badge>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className={`mx-auto transition-all duration-500 ${isFullscreen ? 'scale-110' : 'scale-100'}`}>
        <div 
          className="relative mx-auto shadow-2xl"
          style={{
            width: `${phoneConfig.width + phoneConfig.bezels.left + phoneConfig.bezels.right}px`,
            height: `${phoneConfig.height + phoneConfig.bezels.top + phoneConfig.bezels.bottom}px`,
            borderRadius: phoneConfig.borderRadius,
            background: selectedPhone === 'iphone' 
              ? 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)' 
              : selectedPhone === 'pixel'
              ? 'linear-gradient(135deg, #202124 0%, #131314 100%)'
              : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Volume & Power buttons (iPhone) */}
          {selectedPhone === 'iphone' && (
            <>
              <div className="absolute left-0 top-16 w-1 h-8 bg-gradient-to-b from-gray-600 to-gray-800 rounded-r" />
              <div className="absolute left-0 top-28 w-1 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-r" />
              <div className="absolute left-0 top-36 w-1 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-r" />
              <div className="absolute right-0 top-20 w-1 h-12 bg-gradient-to-b from-gray-600 to-gray-800 rounded-l" />
            </>
          )}

          {/* Camera bump (Android) */}
          {selectedPhone !== 'iphone' && (
            <div className="absolute top-2 right-4 w-8 h-8 bg-black/20 rounded-xl" />
          )}

          {/* Phone Screen */}
          <div 
            className="relative overflow-hidden m-2"
            style={{
              width: `${phoneConfig.width}px`,
              height: `${phoneConfig.height}px`,
              borderRadius: `calc(${phoneConfig.borderRadius} - 12px)`,
              background: typeof networkConfig.backgroundColor === 'string' && networkConfig.backgroundColor.startsWith('linear-gradient') 
                ? networkConfig.backgroundColor 
                : networkConfig.backgroundColor
            }}
          >
            {/* Notch (iPhone only) */}
            {phoneConfig.notch && (
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black z-50"
                style={{
                  width: '150px',
                  height: '25px',
                  borderRadius: '0 0 15px 15px'
                }}
              />
            )}

            {/* Status Bar */}
            <div 
              className="flex justify-between items-center px-4 py-2 text-white text-xs font-medium z-40 relative"
              style={{ 
                background: networkConfig.statusBar,
                paddingTop: phoneConfig.notch ? '30px' : '12px'
              }}
            >
              <div className="flex items-center space-x-1">
                <span>{getCurrentTime()}</span>
              </div>
              <div className="flex items-center space-x-1">
                {/* Signal bars */}
                <div className="flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-white rounded-full ${
                        i < getSignalBars() ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{ height: `${(i + 1) * 3}px` }}
                    />
                  ))}
                </div>
                {/* WiFi icon */}
                <div className="text-white text-xs">📶</div>
                {/* Battery */}
                <div className="flex items-center">
                  <div className="w-6 h-3 border border-white rounded-sm relative">
                    <div 
                      className="h-full bg-white rounded-sm"
                      style={{ width: `${getBatteryLevel()}%` }}
                    />
                  </div>
                  <div className="w-1 h-1 bg-white ml-1 rounded-r" />
                </div>
              </div>
            </div>

            {/* App Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <NetworkIcon className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-medium text-sm">{networkConfig.header.title}</h3>
                  <p className="text-white/70 text-xs">{networkConfig.header.time}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">•••</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 overflow-hidden" style={{ height: `${phoneConfig.height - 120}px` }}>
              {/* Logo Area - Positionné en haut à gauche, sans fond sombre */}
              {logoPreview && (
                <div className="absolute top-6 left-4 z-30">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shadow-lg ring-2 ring-white/20">
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Main Animation Canvas - Canvas principal avec zones définies */}
              <div className="absolute inset-0 z-10">
                <canvas
                  ref={canvasRef}
                  width={phoneConfig.width}
                  height={phoneConfig.height}
                  className="w-full h-full object-contain"
                  style={{
                    backgroundColor: 'transparent'
                  }}
                />
              </div>

              {/* Main Text Overlay - Texte principal sans fond sombre */}
              {(mainText || boutique) && (
                <div className="absolute top-20 left-4 right-4 z-25 pointer-events-none">
                  <div className="text-center">
                    <h2 
                      className="text-white font-bold text-xl leading-tight drop-shadow-2xl"
                      style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)'
                      }}
                    >
                      {mainText || boutique || 'Votre Business'}
                    </h2>
                  </div>
                </div>
              )}

              {/* Secondary Text - Informations business bien réparties */}
              {secondaryText && (
                <div className="absolute top-1/2 left-4 right-4 z-25 transform -translate-y-1/2">
                  <div className="text-center space-y-3">
                    {secondaryText.split('\n').map((line, i) => (
                      <div 
                        key={i} 
                        className="text-white text-sm font-medium px-2 py-1 rounded-lg"
                        style={{
                          textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)',
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information - Design plus élégant */}
              {telephone && (
                <div className="absolute bottom-24 left-4 right-4 z-25">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-3 rounded-2xl border border-green-400/20 shadow-lg">
                    <div className="text-center">
                      <div 
                        className="text-white text-sm font-medium flex items-center justify-center"
                        style={{
                          textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                        }}
                      >
                        📞 {telephone}
                      </div>
                      <div className="text-xs text-green-200 mt-1">
                        Contactez-nous !
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute bottom-6 right-4 left-4 z-30 flex justify-between items-center">
                {/* WhatsApp Contact Button */}
                {selectedNetwork === 'whatsapp' && telephone && (
                  <Button
                    onClick={onWhatsAppContact}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-lg text-sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                )}

                {/* Social Media Actions */}
                {selectedNetwork !== 'whatsapp' && (
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="rounded-full p-3 bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      ❤️
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full p-3 bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      💬
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full p-3 bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      📤
                    </Button>
                  </div>
                )}
              </div>

              {/* Network-specific overlays */}
              {selectedNetwork === 'instagram' && boutique && (
                <div className="absolute top-20 left-4 right-4 z-20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold">
                          {boutique.charAt(0)}
                        </div>
                      </div>
                      <span className="text-white font-medium text-sm">{boutique}</span>
                    </div>
                    <div className="text-white text-xs">il y a 2min</div>
                  </div>
                </div>
              )}
            </div>

            {/* Home Indicator (iPhone) */}
            {phoneConfig.homeIndicator && (
              <div 
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/30 rounded-full"
                style={{ width: '134px', height: '5px' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Preview Info avec informations temps réel détaillées */}
      <div className="text-center space-y-3">
        <p className="text-sm text-slate-400">
          Aperçu réaliste sur {networkConfig.name}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-500">
          <div className="bg-slate-800/50 p-2 rounded">
            <div>📱 {phoneConfig.name}</div>
          </div>
          <div className="bg-slate-800/50 p-2 rounded">
            <div>📊 {selectedFormat}</div>
          </div>
          <div className="bg-slate-800/50 p-2 rounded">
            <div>🎨 Temps réel</div>
          </div>
          <div className="bg-slate-800/50 p-2 rounded">
            <div>🌐 {networkConfig.name}</div>
          </div>
        </div>

        {/* Informations détaillées sur les éléments du mockup */}
        <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-slate-300 mb-2">🎯 Disposition des éléments:</h4>
          <div className="text-xs text-slate-400 space-y-1">
            <div>• <strong>Logo:</strong> Haut gauche avec fond semi-transparent</div>
            <div>• <strong>Texte principal:</strong> Intégré dans le canvas avec overlay</div>
            <div>• <strong>Canvas d'animation:</strong> Centré avec les effets en temps réel</div>
            <div>• <strong>Informations business:</strong> Positionnées au centre</div>
            <div>• <strong>Contact:</strong> Barre verte en bas avec numéro</div>
            <div>• <strong>Actions:</strong> Boutons d'interaction en bas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
