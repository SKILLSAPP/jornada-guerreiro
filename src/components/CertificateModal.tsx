
import React, { useMemo } from 'react';
import { Island } from '../types';

interface CertificateModalProps {
  fullPlayerName: string;
  proficiencyLevel: string;
  island: Island;
  date: string;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ fullPlayerName, proficiencyLevel, island, date, onClose }) => {
  const certificateId = useMemo(() => {
    return `ON-${island.id}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }, [island.id]);

  const displayIslandName = useMemo(() => {
    const name = island.name.trim();
    return name.toLowerCase().startsWith('ilha') ? name : `Ilha ${name}`;
  }, [island.name]);

  const downloadAsHtml = () => {
    const certificateContent = document.getElementById('certificate-main-body')?.innerHTML;
    const styles = document.getElementById('certificate-styles')?.innerHTML;
    
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificado - ${fullPlayerName}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          ${styles}
          body { 
            background: #222; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            margin: 0;
            padding: 0;
          }
          .certificate-container {
            background: #fdfcf7;
            border: 10px double #2c2c2c;
            padding: 30px 50px;
            text-align: center;
            width: 297mm;
            height: 210mm;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            overflow: hidden;
          }
          .font-cinzel { font-family: 'Cinzel', serif; }
          .ribbon-glow { filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2)); }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          ${certificateContent}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificado_skillsON_${fullPlayerName.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 no-print overflow-auto">
      <div className="bg-white w-full max-w-[1150px] overflow-hidden rounded-sm shadow-2xl flex flex-col">
        
        {/* Header de Ações */}
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center no-print">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/NkZe6o8_d.jpeg?maxwidth=520&shape=thumb&fidelity=high" alt="Logo" className="h-6" />
            <h3 className="font-cinzel text-gray-800 font-bold">Emissão de Certificado - A4 Paisagem</h3>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={downloadAsHtml}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded font-bold transition-colors flex items-center gap-2 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Certificado (HTML)
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">&times;</button>
          </div>
        </div>

        {/* Visualização Calibrada (A4 Paisagem Exato) */}
        <div className="p-4 bg-gray-300 flex justify-center items-center overflow-auto min-h-[850px]">
          <div 
            id="certificate-main-body" 
            className="relative bg-[#fdfcf7] border-[10px] border-double border-[#2c2c2c] p-10 text-center shadow-inner flex flex-col justify-between items-center mx-auto"
            style={{ 
              width: '297mm', 
              height: '210mm', 
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
            
            {/* Cantoneiras Clássicas */}
            <div className="absolute top-5 left-5 w-20 h-20 border-t-2 border-l-2 border-yellow-600/30"></div>
            <div className="absolute top-5 right-5 w-20 h-20 border-t-2 border-r-2 border-yellow-600/30"></div>
            <div className="absolute bottom-5 left-5 w-20 h-20 border-b-2 border-l-2 border-yellow-600/30"></div>
            <div className="absolute bottom-5 right-5 w-20 h-20 border-b-2 border-r-2 border-yellow-600/30"></div>

            <div className="w-full flex flex-col items-center flex-grow justify-center gap-3">
              {/* Logo skills.ON! */}
              <div className="mb-1">
                <img 
                  src="https://i.imgur.com/NkZe6o8_d.jpeg?maxwidth=520&shape=thumb&fidelity=high" 
                  alt="skills.ON!" 
                  className="h-16 mx-auto object-contain"
                />
              </div>

              <h1 className="font-cinzel text-3xl text-[#1a1a1a] tracking-widest uppercase">Certificado de Maestria</h1>
              <div className="w-56 h-0.5 bg-yellow-600 mx-auto"></div>
              
              <p className="font-serif italic text-lg text-gray-500">Pelo presente, certificamos que o bravo guerreiro</p>
              
              <h2 className="font-cinzel text-3xl text-[#1a1a1a] font-bold py-2 border-b border-gray-200 inline-block min-w-[450px]">
                {fullPlayerName}
              </h2>

              <p className="font-serif text-lg text-gray-600 max-w-4xl mx-auto leading-tight px-4 mt-2">
                Concluiu com honra e distinção os estudos e desafios da <br/>
                <span className="font-bold text-[#1a1a1a] text-xl">Gamificação Jornada do Guerreiro</span> conquistando a <br/>
                <span className="font-bold text-[#1a1a1a] uppercase text-xl">{displayIslandName}</span> da <span className="text-blue-700 font-bold">Mentor.IA skills.ON!</span>,<br/>
                tendo demonstrado domínio excepcional na Soft Skill <br/>
                <span className="font-bold text-yellow-700 italic text-3xl my-1 block">"{island.softSkill}"</span>
              </p>

              {/* Selo de Proficiência com Fitas */}
              <div className="relative inline-flex flex-col items-center justify-center mt-2 scale-90">
                <svg width="150" height="180" viewBox="0 0 100 120" className="ribbon-glow">
                  <defs>
                    <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#fde047', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#854d0e', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  
                  <path d="M35 60 L25 110 L45 100 L50 110 L55 100 L75 110 L65 60" fill="url(#gold-metal)" opacity="0.9" />
                  <path d="M35 60 L25 110 L45 100 L35 60 Z" fill="#a16207" opacity="0.3" />
                  <path d="M65 60 L75 110 L55 100 L65 60 Z" fill="#a16207" opacity="0.3" />

                  <path 
                    d="M50 10 
                       C55 10, 58 7, 63 10 
                       C68 13, 72 13, 75 17 
                       C78 21, 82 22, 83 27 
                       C84 32, 87 35, 85 40 
                       C83 45, 84 50, 81 55 
                       C78 60, 76 64, 70 67 
                       C64 70, 59 73, 50 73 
                       C41 73, 36 70, 30 67 
                       C24 64, 22 60, 19 55 
                       C16 50, 17 45, 15 40 
                       C13 35, 16 32, 17 27 
                       C18 22, 22 21, 25 17 
                       C28 13, 32 13, 37 10 
                       C42 7, 45 10, 50 10" 
                    fill="url(#gold-metal)" 
                    stroke="#854d0e" 
                    strokeWidth="0.5"
                  />
                  
                  <circle cx="50" cy="41.5" r="23" fill="none" stroke="#fefce8" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
                </svg>

                {/* Container de Texto Centralizado no Círculo do Selo */}
                <div className="absolute top-[28px] h-[68px] w-full flex flex-col items-center justify-center px-4 leading-tight">
                   <span className="text-[10px] font-black text-yellow-950 uppercase tracking-tight opacity-80">Grau de Proficiência</span>
                   <span className="text-[17px] font-black text-yellow-900 uppercase mt-0.5 drop-shadow-sm tracking-tighter">
                     {proficiencyLevel.toUpperCase()}
                   </span>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-end px-12 pt-2 pb-2">
              <div className="text-left relative flex flex-col items-start">
                <div className="absolute -top-16 left-2 w-52 pointer-events-none">
                  <img 
                    src="https://i.imgur.com/XUMHZIq_d.jpeg?maxwidth=520&shape=thumb&fidelity=high" 
                    alt="Assinatura" 
                    className="w-full opacity-90 mix-blend-multiply grayscale contrast-150 brightness-110"
                    style={{ transform: 'rotate(-1deg)' }}
                  />
                </div>
                <div className="w-56 border-b border-gray-400 mb-1"></div>
                <p className="font-cinzel text-sm text-gray-800 font-bold uppercase tracking-wider">José Marcelo Lustosa</p>
                <p className="text-[11px] text-gray-500">Mentor da skills.ON!</p>
              </div>

              <div className="text-right flex flex-col items-end">
                <p className="font-serif text-sm text-gray-600">Concedido em:</p>
                <p className="font-bold text-gray-800 text-base">{new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                <p className="text-[10px] text-gray-400 mt-1 font-mono">Autenticidade: {certificateId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style id="certificate-styles" dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          #certificate-main-body {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            border: 10mm double #1a1a1a !important;
            box-shadow: none !important;
            background-color: #fdfcf7 !important;
            box-sizing: border-box !important;
          }
        }
      `}} />
    </div>
  );
};

export default CertificateModal;
