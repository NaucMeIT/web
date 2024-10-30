// components/GlobalModal.tsx
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'

const MODAL_COOKIE_KEY = 'global_modal_closed';

export function GlobalModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasClosedModal = document.cookie
      .split('; ')
      .find(row => row.startsWith(MODAL_COOKIE_KEY))
      ?.split('=')[1];

    if (!hasClosedModal) {
      setIsOpen(true);
    }
  }, []);

  const handleChange = (isOpen: boolean) => {
    if (isOpen) {
      setIsOpen(isOpen)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    // Set cookie to expire in 1 year
    document.cookie = `${MODAL_COOKIE_KEY}=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full xl:w-1/2 h-fit -translate-x-1/2 -translate-y-1/2 bg-background p-6 shadow-lg">
          <Dialog.Close asChild onClick={handleClose}>
            <button type="button" className='z-50 absolute top-0 right-0 flex flex-col items-center justify-center p-3 duration-500 outline-none cursor-pointer lg:p-6 hover:opacity-30'>
                <XMarkIcon className='block h-10 w-10' aria-hidden='true' />
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-lg font-semibold">
            AI Kurz
          </Dialog.Title>

          <div className="mt-4">
            <p className="text-gray-600">
              <iframe className='w-full aspect-video' src="https://www.youtube.com/embed/ZXB3XTZRtdk" title="Pozvánka na AI kurz" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </p>
          </div>
          <div className='flex mt-3 justify-center w-full'><Button theme="main">Vzhůru na AI kurz!</Button></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
