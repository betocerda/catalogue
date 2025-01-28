import { NextResponse } from 'next/server';

// function for fetching data from url
export async function GET() {
  try {
    const response = await fetch('https://my-json-server.typicode.com/aylin-vdo/Greyball-challenge-json/products');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // parse json data
    const products = await response.json();
    // return as json response
    return NextResponse.json({ products });
    
  } catch (error) {
    // log the error
    console.error('API Error:', error);
    // return as json response with error
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}