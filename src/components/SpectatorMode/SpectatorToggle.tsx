import React from 'react';
import { useTranslation } from 'react-i18next';
import { updatePlayerInStore } from '../../repository/firebase';
import { Player } from '../../types/player';

interface SpectatorToggleProps {
  gameId: string;
  currentPlayer: Player;
}

export const SpectatorToggle: React.FC<SpectatorToggleProps> = ({ gameId, currentPlayer }) => {
  const { t } = useTranslation();
  const isSpectator = currentPlayer.isSpectator || false;

  const toggleSpectatorMode = async () => {
    const updatedPlayer: Player = {
      ...currentPlayer,
      isSpectator: !isSpectator,
    };
    await updatePlayerInStore(gameId, updatedPlayer);
  };

  return (
    <div className='flex items-center justify-center gap-2 mb-2'>
      <label className='flex items-center cursor-pointer'>
        <span className='mr-2 text-xs font-medium'>
          {t('SpectatorMode.spectatorMode', 'Spectator Mode')}
        </span>
        <button
          type='button'
          role='switch'
          aria-checked={isSpectator}
          aria-label={t('SpectatorMode.toggleSpectatorMode', 'Toggle spectator mode')}
          onClick={toggleSpectatorMode}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
            isSpectator ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          style={{ minWidth: '2.5rem' }}
        >
          <span
            className={`inline-block h-4 w-4 cursor-pointer transform rounded-full bg-white shadow transition-transform ${
              isSpectator ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
      </label>
      {isSpectator && (
        <span className='text-xs text-purple-600 dark:text-purple-400' title='You are observing'>
          👁️
        </span>
      )}
    </div>
  );
};
