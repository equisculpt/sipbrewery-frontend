import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="p-6 border-2 border-gray-700 bg-white/5 backdrop-blur-md rounded-2xl animate-pulse"
        >
          {/* Header skeleton */}
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-600 rounded w-48"></div>
              <div className="h-4 bg-gray-700 rounded w-32"></div>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          </div>

          {/* NAV skeleton */}
          <div className="flex items-baseline space-x-3 mb-4">
            <div className="h-8 bg-gray-600 rounded w-24"></div>
            <div className="h-5 bg-gray-700 rounded w-16"></div>
          </div>

          {/* Performance metrics skeleton */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-3 bg-gray-700 rounded w-16 mx-auto"></div>
                <div className="h-6 bg-gray-600 rounded w-12 mx-auto"></div>
              </div>
            ))}
          </div>

          {/* Additional info skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-4 bg-gray-700 rounded w-20"></div>
            <div className="h-4 bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-600 rounded-full w-24"></div>
          </div>

          {/* Action buttons skeleton */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 bg-gray-700 rounded-xl"></div>
            <div className="h-12 bg-gray-600 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
