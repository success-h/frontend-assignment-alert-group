'use client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { accountTypedata } from '@/constants/data';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import {
  clearAccountType,
  selectAccountType,
  selectBusinessDetails,
  setAccountType,
  setBusinessDetails,
} from '@/lib/redux/slices/business_details';
import { selectDrawer, setDrawerState } from '@/lib/redux/slices/drawer';
import { ArrowLeft, ChevronRightIcon, LucideGlobe } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createBusinessSchema } from '@/lib/schema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

export default function AddBusiness() {
  const drawerOpen = useAppSelector(selectDrawer);
  const businessDetails = useAppSelector(selectBusinessDetails);
  const dispatch = useAppDispatch();
  const accountType = useAppSelector(selectAccountType);
  const router = useRouter();
  const form = useForm<z.infer<typeof createBusinessSchema>>({
    resolver: zodResolver(createBusinessSchema),
  });

  function onSubmit(data: z.infer<typeof createBusinessSchema>) {
    dispatch(setBusinessDetails(data));
    router.push('/');
    dispatch(setDrawerState(drawerOpen));
  }

  useEffect(() => {
    if (!businessDetails) {
      dispatch(setDrawerState(false));
    }
  }, [drawerOpen]);

  return (
    <Drawer open={drawerOpen}>
      <DrawerContent className="h-[90%] rounded-t-3xl">
        <div className="flex px-10 justify-between">
          <div className="flex items-center">
            <Image
              height={20}
              width={20}
              alt="add-business-icon"
              src={'/assets/icons/add-business.svg'}
            />
            <div className="pl-2 border-l-2 ml-2">Add a Business</div>
          </div>
          <Button
            onClick={() => dispatch(setDrawerState(drawerOpen))}
            className="bg-[#FAFAFB] p-3 rounded-full"
            variant={'ghost'}
          >
            <IoClose className="h-10 w-10" />
          </Button>
        </div>
        <div className="flex mt-10">
          <div className="w-[285px] max-md:hidden pt-5 pl-10 flex flex-col">
            {Array.from({ length: 8 }).map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-center mt-4 space-x-2"
              >
                <Skeleton className="h-7 w-7 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-7 w-[140px]" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 border-t border-l h-full py-10">
            {accountType ? (
              <div className="max-w-[460px] w-full mx-auto xl:ml-96">
                <h1 className="text-3xl font-bold">
                  Provide some info about your business
                </h1>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 mt-10"
                  >
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400 font-normal text-sm">
                            Where is your business located{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-xl text-gray-400 w-full active:ring-1 focus:ring-1 outline-none border-none bg-[#FAFAFB] h-12">
                                <SelectValue
                                  className="font-normal text-sm"
                                  placeholder="Select location"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#222] rounded-xl text-white">
                              <SelectItem
                                value="Nigeria"
                                className="flex  hover:bg-black"
                              >
                                <Image
                                  src="/assets/nigeria.png"
                                  alt="img"
                                  height={19}
                                  width={19}
                                />
                                Nigerian
                              </SelectItem>
                              <SelectItem className="flex" value="Other">
                                <div className="">
                                  <LucideGlobe />
                                </div>
                                <p>Other Countries</p>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400 font-normal text-sm">
                            What is your business name?{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-xl outline-none border-none bg-[#FAFAFB] h-12"
                              placeholder="Business Name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-end text-gray-400">
                            Use the registered business name on your document
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400 font-normal text-sm">
                            Business Industry{' '}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-xl text-gray-400 w-full active:ring-1 focus:ring-1 outline-none border-none bg-[#FAFAFB] h-12">
                                <SelectValue
                                  className="text-gray-400 font-normal text-sm"
                                  placeholder="Select Industry"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#222] rounded-xl text-white">
                              <SelectItem
                                value="Nigeria"
                                className="flex  hover:bg-black"
                              >
                                Financial technology
                              </SelectItem>
                              <SelectItem className="flex" value="Other">
                                Ecommerce
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2 items-center justify-between">
                      <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-gray-400 font-normal text-sm">
                              Company Size
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-xl text-gray-400 w-full active:ring-1 focus:ring-1 outline-none border-none bg-[#FAFAFB] h-12">
                                  <SelectValue
                                    className="text-gray-400 font-normal text-sm"
                                    placeholder="Select Industry"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#222] rounded-xl text-white">
                                <SelectItem
                                  value="Nigeria"
                                  className="flex  hover:bg-black"
                                >
                                  1-100
                                </SelectItem>
                                <SelectItem className="flex" value="Other">
                                  101-200
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />{' '}
                      <FormField
                        control={form.control}
                        name="estimatedVolume"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-gray-400 font-normal text-sm">
                              Estimated annual volume
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-xl text-gray-400 w-full active:ring-1 focus:ring-1 outline-none border-none bg-[#FAFAFB] h-12">
                                  <SelectValue
                                    className="text-gray-400 font-normal text-sm"
                                    placeholder="Select an option"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#222] rounded-xl text-white">
                                <SelectItem
                                  value="Nigeria"
                                  className="flex  hover:bg-black"
                                >
                                  $1,000 - $10,000
                                </SelectItem>
                                <SelectItem className="flex" value="Other">
                                  $10,001 - $50,000
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        variant={'outline'}
                        type="button"
                        onClick={() => {
                          dispatch(clearAccountType());
                        }}
                        className="h-12 px-10 rounded-2xl"
                      >
                        <ArrowLeft />
                        Go back
                      </Button>

                      <Button
                        type="submit"
                        className="bg-black h-12 px-10 rounded-2xl hover:bg-black/60"
                      >
                        Create Business
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            ) : (
              <div className="max-w-[460px] w-full mx-auto xl:ml-96">
                <h1 className="text-3xl font-bold">
                  What kind of account do you want to open?
                </h1>
                <p className="mt-4 text-gray-500">
                  You can always add another account later on.
                </p>
                <hr className="my-10" />
                {accountTypedata?.map((item, index) => (
                  <div
                    key={index}
                    className="flex hover:border-primary cursor-pointer hover:bg-transparent border my-4 rounded-2xl p-5 items-center justify-between w-full"
                    onClick={() => {
                      dispatch(setAccountType(item.type));
                    }}
                  >
                    <div className="flex flex-1 items-center gap-4">
                      <Image
                        className="rounded-full h-[40px] w-[40px]"
                        src={item.img}
                        alt="icon"
                        height={48}
                        width={48}
                      />
                      <div className="text-sm text-start text-gray-500">
                        <p className="text-[16px] mb-1 font-semibold text-black">
                          {item.type}
                        </p>
                        {item.desc}
                      </div>
                    </div>
                    <Button
                      variant={'ghost'}
                      className="bg-[#FAFAFB] h-8 w-8 ml-3 flex rounded-full"
                    >
                      <ChevronRightIcon />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
