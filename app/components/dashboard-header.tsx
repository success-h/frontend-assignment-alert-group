'use client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

export default function DashboardHeader() {
  const [isLive, setLive] = useState(false);
  return (
    <div className="h-20 flex border-b border-grey items-center justify-between px-10">
      <h2>Dashboard</h2>
      <div className="flex items-center ">
        <div className="flex items-center space-x-2 border-r pr-4">
          <Label
            className={`font-bold ${
              isLive ? 'text-green-500' : 'text-red-500'
            }`}
            htmlFor="airplane-mode"
          >
            {isLive ? 'Live' : 'Test'}
          </Label>
          <Switch checked={isLive} onCheckedChange={setLive} id="toggle-mode" />
        </div>
        <div className="flex items-center gap-x-4 ml-3">
          <div className="relative">
            <IoNotificationsOutline size={24} />
            <div className="h-2 w-2 absolute top-0 right-0 bg-red-500 rounded-full"></div>
          </div>
          <Image
            height={40}
            width={40}
            src={'/assets/avatar.png'}
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}
