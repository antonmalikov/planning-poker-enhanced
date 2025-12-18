import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';

interface QRCodeDisplayProps {
  url: string;
  gameName: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, gameName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md'
        title={t('QRCode.showQRCode', 'Show QR Code')}
      >
        <svg
          className='h-5 w-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z'
          />
        </svg>
        <span className='text-sm font-medium'>{t('QRCode.qrCode', 'QR Code')}</span>
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
          onClick={() => setIsOpen(false)}
        >
          <div
            className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                {t('QRCode.scanToJoin', 'Scan to Join')}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition'
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-white p-4 rounded-xl shadow-inner'>
                <QRCodeSVG
                  value={url}
                  size={256}
                  level='H'
                  includeMargin={true}
                  bgColor='#ffffff'
                  fgColor='#000000'
                  aria-label={t('QRCode.qrCodeFor', `QR code for ${gameName}`)}
                  role='img'
                />
              </div>

              <div className='mt-6 text-center'>
                <p className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                  {gameName}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                  {t(
                    'QRCode.scanInstructions',
                    'Scan this QR code with your phone camera to join the session',
                  )}
                </p>
                <div className='bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mt-4'>
                  <p className='text-xs text-gray-600 dark:text-gray-400 mb-1'>
                    {t('QRCode.orVisit', 'Or visit:')}
                  </p>
                  <p className='text-xs font-mono text-gray-800 dark:text-gray-200 break-all'>
                    {url}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className='mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors font-medium'
              >
                {t('QRCode.close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
