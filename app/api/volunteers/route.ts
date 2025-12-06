import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BuildDay from '@/models/BuildDay'

export async function GET() {
  try {
    await dbConnect()
    const buildDays = await BuildDay.find({ status: { $ne: 'cancelled' } })
      .sort({ date: 1 })
      .limit(10)

    return NextResponse.json({ buildDays })
  } catch (error) {
    console.error('Get volunteers error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
