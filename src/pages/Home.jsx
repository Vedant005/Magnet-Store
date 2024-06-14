import React from 'react';
import { Header } from '../components/Header';

export default function App() {
  return (
    <div className="bg-gray-400">
      <div className='sticky top-0 z-10'>
        <Header />
      </div>
      <div
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1607384070812-0965d8827f6f?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          
        }}
        className='w-full h-[600px] bg-cover bg-center flex items-center justify-center'
      >
        <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold mb-4 text-white">Unveiling the New</h1>
          <p className="text-lg mb-4 text-white">UPTO 80% OFF on various products</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg">Shop Now</button>
        </div>
      </div>
      <div className='w-full h-10'></div>
      <div className='w-full h-10'></div>
      
      
      <div className='text-center'>
        <h1 className='font-bold underline '>FEATURED PRODUCTS</h1>
      <div className='flex justify-center'>
        
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-2  mx-2 my-5'>
          <div style={{backgroundImage: `url(https://images.unsplash.com/photo-1567763745030-bfe9c51bec27?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
          }} className='min-h-[300px] w-[400px] rounded bg-orange-400 shadow-xl flex items-center justify-center' >
             
          </div>
          <div style={{backgroundImage: `url(https://images.unsplash.com/photo-1567763745030-bfe9c51bec27?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
          }} className='min-h-[300px] w-[100%] rounded bg-orange-400 shadow-xl flex items-center justify-center'>
            <p>Card 2</p>
          </div>
          <div style={{backgroundImage: `url(https://images.unsplash.com/photo-1567763745030-bfe9c51bec27?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
          }} className='min-h-[300px] w-[100%] rounded bg-orange-400 shadow-xl flex items-center justify-center'>
            <p>Card 3</p>
          </div>
          <div style={{backgroundImage: `url(https://images.unsplash.com/photo-1567763745030-bfe9c51bec27?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
          }} className='min-h-[300px] w-[100%] rounded bg-orange-400 shadow-xl flex items-center justify-center'>
            <p>Card 4</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
