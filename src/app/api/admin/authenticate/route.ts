import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// In production, store this in environment variables
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // Default: "password"
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // In production, compare with environment variable hash
    const isValidPassword = process.env.NODE_ENV === 'development' 
      ? password === 'darth2024' // Only for development
      : await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValidPassword) {
      // Add delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2) // 2 hours
      },
      JWT_SECRET
    );

    return NextResponse.json({ 
      token,
      message: 'Authentication successful' 
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication service error' },
      { status: 500 }
    );
  }
}