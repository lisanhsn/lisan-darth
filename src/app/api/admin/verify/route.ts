import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No valid authorization token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }

      // Check if user has admin role
      if (decoded.role !== 'admin') {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      return NextResponse.json({ 
        valid: true,
        user: { role: decoded.role }
      });

    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Verification service error' },
      { status: 500 }
    );
  }
}