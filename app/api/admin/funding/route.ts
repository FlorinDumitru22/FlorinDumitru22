import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Funding from '@/models/Funding'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    await dbConnect()
    const funding = await Funding.findOne()

    if (!funding) {
      return NextResponse.json({ error: 'Funding data not found' }, { status: 404 })
    }

    return NextResponse.json({ funding })
  } catch (error) {
    console.error('Get funding error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const updates = await request.json()

    await dbConnect()
    let funding = await Funding.findOne()

    if (!funding) {
      funding = new Funding(updates)
    } else {
      Object.assign(funding, updates)
    }

    await funding.save()

    return NextResponse.json({ success: true, funding })
  } catch (error) {
    console.error('Update funding error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
