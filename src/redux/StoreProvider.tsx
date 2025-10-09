'use client'
import { Provider } from 'react-redux'
import { store } from './store'
import { Header } from '@/components/ui/Header'
import { ThemeProvider } from 'next-themes'
import { CartProvider } from './CartProvider'
import { SidebarProvider } from '@/app/context/SidebarProvider'
import SidebarCart from '@/components/common/SidebarCart'
import ToasterProvider from '@/components/common/ToasterProvider'



function WrapperLayout({
  children
}: {
  children: React.ReactNode
}) {



  return (
    <div className={` bg-[#E5E7EB] text-black dark:bg-[#101828] dark:text-gray-50 min-h-screen`}>
      <ToasterProvider />
      {/* <button type='button' onClick={handleToggle} className='bg-amber-500'>hierrr</button> */}
      <Header />
      <SidebarCart />
      <main className=''>{children}</main>


    </div>
  )
}


export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
        <CartProvider>
          <SidebarProvider>

            <WrapperLayout>
              {children}
            </WrapperLayout>

          </SidebarProvider>
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
}