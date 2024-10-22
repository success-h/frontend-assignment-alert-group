'use client';

import { Button } from '@/components/ui/button';
import { DashboardBalanceData } from '@/constants/data';
import { useAppSelector } from '@/lib/redux/hook';
import { selectBusinessDetails } from '@/lib/redux/slices/business_details';
import { HiDotsVertical } from 'react-icons/hi';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { IoTime } from 'react-icons/io5';
import Image from 'next/image';

export default function DashboardInfo() {
  const businessDetails = useAppSelector(selectBusinessDetails);
  return (
    <div className="p-7 lg:px-16 pt-10">
      <div className="flex max-md:flex-col border-b pb-5 border-grey md:items-center justify-between">
        <h1 className="text-lg md:text-2xl">
          Good Afternoon, {businessDetails?.businessName}
        </h1>
        <p className="max-md:text-xs text-sm text-gray-500">
          Tuesday, October 22, 2024
        </p>
      </div>
      <>
        <div className="flex pt-5 flex-col md:flex-row md:items-center md:justify-between">
          <div className="inline-flex gap-2 max-md:justify-between max-md:mb-7">
            <Button className="bg-[#343433] hover:bg-black font-bold rounded-full h-[42px]">
              CAD
            </Button>
            <Button
              variant={'ghost'}
              className="text-gray-400 font-bold rounded-full h-[42px]"
            >
              GBP
            </Button>
            <Button
              variant={'ghost'}
              className="text-gray-400 font-bold rounded-full h-[42px]"
            >
              USD
            </Button>
            <Button
              variant={'ghost'}
              className="text-gray-400 font-bold rounded-full h-[42px]"
            >
              CAD
            </Button>
          </div>
          <div className="inline-flex gap-4">
            <Button className="bg-primary rounded-xl h-[43px]">
              Add Money
            </Button>
            <Button variant={'outline'} className="rounded-xl h-[43px]">
              Send Money
            </Button>

            <Button variant={'outline'} className="rounded-xl px-3 h-[43px]">
              <HiDotsVertical />
            </Button>
          </div>
        </div>
      </>
      <>
        <div className="flex flex-wrap justify-between mt-10 max-md:mt-20 border-b pb-10">
          {DashboardBalanceData?.map((item, index) => (
            <div className="" key={index}>
              <p className="text-gray-500 mb-2 flex gap-1 items-center">
                {item.title} <IoTime size={15} color="gray" />
              </p>
              <p className="text-xl mb-2 lg:text-3xl font-medium text-black">
                {item.amount}
              </p>
              <p
                className={`flex items-center space-x-2 ${
                  item?.arrowUp ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {item?.arrowUp ? (
                  <MdArrowUpward color="green" />
                ) : (
                  <MdArrowDownward color="red" />
                )}{' '}
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </>
      {/* Chart. I will be using an image representation for this test case */}
      <Image
        src={'/assets/chart.png'}
        height={530}
        width={1026}
        alt="Chart image"
        className="w-full object-contain"
      />
    </div>
  );
}
