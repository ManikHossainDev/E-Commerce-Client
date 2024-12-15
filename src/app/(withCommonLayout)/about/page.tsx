/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
// pages/about.js
import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        </div>
      </header>

      {/* About Content Section */}
      <main>
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Who We Are</h2>
              <p className="mt-1 text-sm text-gray-600">
                Welcome to  E-commerce Store , your one-stop shop for premium products. With a mission to
                provide quality, convenience, and style, we have been serving our customers since our inception.
              </p>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Our Mission</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To deliver high-quality products that meet our customers needs and enhance their lifestyle.
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Our Vision</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To become the most trusted and innovative e-commerce platform in the industry.
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">What We Offer</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    A wide range of products, exceptional customer service, and a seamless shopping experience.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Team Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="https://avatars.githubusercontent.com/u/121743379?v=4"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="https://avatars.githubusercontent.com/u/121743379?v=4"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="https://avatars.githubusercontent.com/u/121743379?v=4"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Join Our Journey Today!
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Explore our catalog and experience the best in online shopping.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-white border border-transparent rounded-md py-3 px-6 text-indigo-600 font-medium hover:bg-indigo-50"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 
