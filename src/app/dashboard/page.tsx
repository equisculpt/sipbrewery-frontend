'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const welcome = searchParams.get('welcome');

  useEffect(() => {
    // If welcome=true, redirect to KYC completion page
    if (welcome === 'true') {
      router.push('/kyc');
    }
  }, [welcome, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-gray-300">Welcome to your SIP Brewery dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
