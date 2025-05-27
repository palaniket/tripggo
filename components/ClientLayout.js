// components/ClientLayout.jsx
"use client";

import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader';

export default function ClientLayout({ children }) {
  return (
    <ClerkProvider>
      <NextTopLoader />
      <Header />
      {children}
      <Footer />
    </ClerkProvider>
  );
}
