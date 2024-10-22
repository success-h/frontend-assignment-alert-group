'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import DashboardIcon from '@/public/assets/icons/dashboard.svg';
import TransactionsIcon from '@/public/assets/icons/transaction.svg';
import RefundsIcon from '@/public/assets/icons/refunds.svg';
import PaymentsIcon from '@/public/assets/icons/payments.svg';
import CardsIcon from '@/public/assets/icons/cards.svg';
import AccountsIcon from '@/public/assets/icons/accounts.svg';
import BillsIcon from '@/public/assets/icons/bill-management.svg';
import EcommerceIcon from '@/public/assets/icons/ecommerce.svg';
import { ChevronRight } from 'lucide-react';

interface INavLinkProps {
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function BottomMenu() {
  const pathname = usePathname();
  const [bottomTab, setBottomTab] = useState(false);
  const router = useRouter();

  const navLinks: INavLinkProps[] = useMemo(() => {
    return [
      {
        path: '/',
        label: 'Dashboard',
        icon: DashboardIcon,
      },
      {
        path: '/transactions',
        label: 'Transactions',
        icon: TransactionsIcon,
      },
      {
        path: '/refunds',
        label: 'Refunds',
        icon: RefundsIcon,
      },
      {
        path: '/payments',
        label: 'Payments',
        icon: PaymentsIcon,
      },
    ];
  }, []);

  return (
    <nav className="flex z-10 fixed border-t bottom-0 right-0 left-0 justify-betwee sm:hidden bg-white">
      <div className="fixed bottom-0 left-0 right-0 p-4">
        {bottomTab && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setBottomTab(!bottomTab)}
          ></div>
        )}
        <div
          className={`${
            bottomTab ? 'translate-y-0' : 'translate-y-full'
          } transform transition-transform duration-300 fixed bottom-0 left-0 right-0 px-7 py-4 pb-14 bg-white shadow-md rounded-t-3xl`}
        >
          <div className="bg-gray-400 mx-auto h-2 w-14 my-4 rounded-full"></div>
          <div
            onClick={() => {
              setBottomTab(false);
              router.push('/cards');
            }}
            className="flex cursor-pointer mt-6 transition-all active:scale-95 items-center justify-between"
          >
            <div className="flex space-x-3 items-center">
              <CardsIcon className={'text-base-content'} />
              <p className="">Cards</p>
            </div>

            <div className="">
              <ChevronRight className={'text-base-content'} />
            </div>
          </div>
          <div
            onClick={() => {
              setBottomTab(false);
              router.push('/accounts');
            }}
            className="flex cursor-pointer mt-6 transition-all active:scale-95 items-center justify-between"
          >
            <div className="flex space-x-3 items-center">
              <AccountsIcon className={'text-base-content'} />
              <p className="">Accounts</p>
            </div>

            <div className="">
              <ChevronRight className={'text-base-content'} />
            </div>
          </div>
          <div
            onClick={() => {
              setBottomTab(false);
              router.push('/bill-management');
            }}
            className="flex cursor-pointer mt-6 transition-all active:scale-95 items-center justify-between"
          >
            <div className="flex space-x-3 items-center">
              <BillsIcon className={'text-base-content'} />
              <p className="">Manage Bills</p>
            </div>

            <div className="">
              <ChevronRight className={'text-base-content'} />
            </div>
          </div>
          <div
            onClick={() => {
              setBottomTab(false);
              router.push('/ecommerce');
            }}
            className="flex cursor-pointer mt-6 transition-all active:scale-95 items-center justify-between"
          >
            <div className="flex space-x-3 items-center">
              <EcommerceIcon className={'text-base-content'} />
              <p className="">Ecommerce</p>
            </div>

            <div className="">
              <ChevronRight className={'text-base-content'} />
            </div>
          </div>
        </div>
      </div>
      <>
        {navLinks.map(({ path, icon: Icon, label }: INavLinkProps, index) => {
          const isActive = pathname?.endsWith(path);
          return (
            <Link
              key={index}
              href={{ pathname: path }}
              className={clsx(
                'flex flex-col justify-between active:scale-95 my-2 items-center mx-auto transition-all rounded-lg'
              )}
              onClick={() => setBottomTab(false)}
            >
              <Icon
                className={clsx('text-2xl', {
                  ['text-base-content']: isActive,
                })}
                stroke={isActive ? '#ACA6F1' : '#8E9093'}
                fontSize={40}
              />
              <p
                className={clsx('text-[10px] pt-1', {
                  ['text-primary/80']: isActive,
                })}
              >
                {label}
              </p>
            </Link>
          );
        })}
      </>
      <button
        className={clsx(
          'text-sm h-12 px-3 cursor-pointer active:scale-95 flex flex-col my-2 hover:gap-x-4 gap-x-6 items-center mx-auto transition-all rounded-lg'
        )}
        onClick={() => setBottomTab(true)}
      >
        <ChevronRight
          className={clsx({
            ['text-base-content']: bottomTab,
          })}
          stroke={bottomTab ? '#ACA6F1' : '#8E9093'}
        />
      </button>
    </nav>
  );
}
