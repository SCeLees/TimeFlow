import React from 'react';
import { X, Image as ImageIcon, Palette, Monitor, Type } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, settings, updateSettings }) => {
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ 
          bgImage: reader.result as string,
          bgType: 'image'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white/95 backdrop-blur-xl shadow-2xl z-50 p-6 transform transition-transform duration-300 ease-in-out border-l border-gray-200 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Monitor className="w-6 h-6" /> 
          页面设置
        </h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Background Type */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">背景类型</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => updateSettings({ bgType: 'image' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                settings.bgType === 'image' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <ImageIcon className="w-4 h-4" /> 图片
            </button>
            <button
              onClick={() => updateSettings({ bgType: 'color' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                settings.bgType === 'color' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Palette className="w-4 h-4" /> 纯色
            </button>
          </div>
        </section>

        {/* Image Settings */}
        {settings.bgType === 'image' && (
          <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">选择图片</h3>
             
             <div className="grid grid-cols-3 gap-2">
                {[
                  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&w=400&q=80',
                  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&w=400&q=80'
                ].map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateSettings({ bgImage: url.replace('&w=400', '&w=2940') })}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                       settings.bgImage?.includes(url.split('?')[0]) ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
                
                {/* Default local images from img folder */}
                {[
                  '/img/background1.jpg',
                  '/img/background2.jpg',
                  '/img/background3.jpg'
                ].map((path, idx) => (
                  <button
                    key={`local-${idx}`}
                    onClick={() => updateSettings({ bgImage: path, bgType: 'image' })}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                      settings.bgImage === path ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">默认背景 {idx + 1}</span>
                    </div>
                  </button>
                ))}
             </div>

             <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden" 
                  id="bg-upload"
                />
                <label 
                  htmlFor="bg-upload"
                  className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all text-gray-500 hover:text-blue-600"
                >
                  <span className="text-sm font-medium">应用本地图片</span>
                </label>
             </div>
          </section>
        )}

        {/* Color Settings */}
        {settings.bgType === 'color' && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-300">
             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">背景颜色</h3>
             <input 
               type="color" 
               value={settings.bgColor}
               onChange={(e) => updateSettings({ bgColor: e.target.value })}
               className="w-full h-12 rounded-xl cursor-pointer"
             />
          </section>
        )}

        <hr className="border-gray-100" />

        {/* Appearance */}
        <section className="space-y-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">外观样式</h3>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">文字颜色</span>
              <span className="text-xs font-mono text-gray-400">{settings.textColor === 'white' ? '白色' : '黑色'}</span>
            </div>
            <div className="flex gap-2">
               <button 
                onClick={() => updateSettings({ textColor: 'white' })}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium ${settings.textColor === 'white' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200'}`}
               >
                 白色
               </button>
               <button 
                onClick={() => updateSettings({ textColor: 'black' })}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium ${settings.textColor === 'black' ? 'bg-gray-100 text-black border-gray-300' : 'bg-white text-gray-600 border-gray-200'}`}
               >
                 黑色
               </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">毛玻璃强度 (Blur)</span>
              <span className="text-xs font-mono text-gray-400">{settings.blurLevel}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={settings.blurLevel}
              onChange={(e) => updateSettings({ blurLevel: parseInt(e.target.value) })}
              className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">卡片透明度 (Opacity)</span>
              <span className="text-xs font-mono text-gray-400">{settings.overlayOpacity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.overlayOpacity}
              onChange={(e) => updateSettings({ overlayOpacity: parseInt(e.target.value) })}
              className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPanel;
