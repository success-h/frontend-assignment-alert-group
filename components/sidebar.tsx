'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { selectSidebar, setShrink } from '@/lib/redux/slices/sidebar';
import { selectBusinessDetails } from '@/lib/redux/slices/business_details';

import { PlusIcon } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { Button } from '@/components/ui/button';
import { selectDrawer, setDrawerState } from '@/lib/redux/slices/drawer';

interface INavLinkProps {
  path: string;
  label: string;
  icon: string;
}

const NavLink: FC<INavLinkProps> = ({ path, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname?.includes(path);
  const dispatch = useAppDispatch();
  const shrink = useAppSelector(selectSidebar);

  const limitWidth = 1000;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < limitWidth) {
        dispatch(setShrink(true));
      } else {
        dispatch(setShrink(false));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [limitWidth]);

  return (
    <Link
      data-tooltip-content={label}
      data-tooltip-place={'right'}
      data-tooltip-id={'nav-item-name-tooltip'}
      href={{ pathname: path }}
      onClick={() => dispatch(setShrink(false))}
      className={`hover:bg-gray-400/20 mx-3 bounce text-medium h-10 px-3 flex my-1 items-center transition-all rounded-lg ${
        isActive && 'font-bold'
      } ${
        shrink ? 'w-14 transition-all justify-center' : 'hover:gap-x-4 gap-x-6'
      }`}
    >
      <Image src={icon} alt="left" height={24} width={24} />
      {!shrink && (
        <p className={`flex-1 ${isActive && 'text-primary'}`}>{label}</p>
      )}
      {shrink && <Tooltip id="nav-item-name-tooltip" />}
    </Link>
  );
};

export function Sidebar() {
  const navLinks: INavLinkProps[] = useMemo(() => {
    return [
      {
        path: `/`,
        label: 'Dashboard',
        icon: '/assets/icons/dashboard.svg',
      },
      {
        path: `/transactions`,
        label: 'Transactions',
        icon: '/assets/icons/transaction.svg',
      },
      {
        path: `/refunds`,
        label: 'Refunds',
        icon: '/assets/icons/refunds.svg',
      },
      {
        path: `/payments`,
        label: 'Payments',
        icon: '/assets/icons/payments.svg',
      },
      {
        path: `/cards`,
        label: 'Cards',
        icon: '/assets/icons/cards.svg',
      },
      {
        path: `/accounts`,
        label: 'Accounts',
        icon: '/assets/icons/accounts.svg',
      },
      {
        path: `/bill-management`,
        label: 'Manage Bills',
        icon: '/assets/icons/bill-management.svg',
      },
      {
        path: `/ecommerce`,
        label: 'Ecommerce',
        icon: '/assets/icons/ecommerce.svg',
      },
    ];
  }, []);

  const navLinks2: INavLinkProps[] = useMemo(() => {
    return [
      {
        path: `/settings`,
        label: 'Settings',
        icon: '/assets/icons/settings.svg',
      },
      {
        path: `/contact-us`,
        label: 'Contact us',
        icon: '/assets/icons/contact.svg',
      },
    ];
  }, []);
  const dispatch = useAppDispatch();
  const businessDetails = useAppSelector(selectBusinessDetails);
  const shrink = useAppSelector(selectSidebar);
  const [showAddBusiness, setShowAddBusiness] = useState(false);
  const drawerOpen = useAppSelector(selectDrawer);

  function handleAddBusiness() {
    setShowAddBusiness(!showAddBusiness);
  }

  return (
    <nav
      className={`px-3 pt-4 flex flex-col justify-between pb-5 max-sm:hidden h-screen bg-grey ${
        shrink ? '' : 'w-[260px]'
      }`}
    >
      <div className={`mt-4 ${shrink ? 'flex flex-col items-center' : ''}`}>
        <div className="mb-20">
          <div className="border bg-white border-gray-300 p-2 rounded-xl focus-within:border-black">
            <Button
              variant={'ghost'}
              className="flex p-0 m-0 items-center justify-between w-full"
              onClick={handleAddBusiness}
            >
              <Image
                className={`rounded-lg h-[40px] w-[40px] ${
                  shrink && 'h-[30px] w-[30px]'
                }`}
                src="/assets/images/avatar.png"
                alt="icon"
                height={40}
                width={40}
              />
              <div className="text-xs text-start text-gray-500">
                {!shrink && (
                  <>
                    <p className="text-sm text-black">
                      {businessDetails?.businessName?.slice(0, 14)}...
                    </p>
                    Business ID: 09387465
                  </>
                )}
              </div>
              <Image
                className="cursor-pointer"
                src="/assets/icons/info.svg"
                alt="icon"
                height={18}
                width={18}
              />
            </Button>
            {showAddBusiness && (
              <div>
                <hr className="my-4" />
                <div
                  data-tooltip-content={'Add a Business'}
                  data-tooltip-place={'bottom'}
                  data-tooltip-id={'add-business'}
                  onClick={() => {
                    handleAddBusiness();
                    dispatch(setDrawerState(drawerOpen));
                  }}
                  className="flex lg:hover:border rounded-lg cursor-pointer items-center"
                >
                  <Button className="bg-grey max-lg:w-full" variant={'ghost'}>
                    <PlusIcon />
                  </Button>
                  {!shrink && <div className="ml-2">Add a Business</div>}
                  {shrink && <Tooltip id="add-business" />}
                </div>
              </div>
            )}
          </div>
        </div>

        {navLinks.map((navlink) => (
          <NavLink {...navlink} key={navlink.path} />
        ))}
      </div>

      <div className="border-t text-medium">
        {navLinks2.map((navlink) => (
          <NavLink {...navlink} key={navlink.path} />
        ))}
      </div>
    </nav>
  );
}
