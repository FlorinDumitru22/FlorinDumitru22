import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Funding from '@/models/Funding'

export async function GET() {
  try {
    await dbConnect()
    const funding = await Funding.findOne()

    if (!funding) {
      return NextResponse.json({
        totalGoal: 85000,
        currentAmount: 0,
        supporterCount: 0,
        stages: [],
      })
    }

    return NextResponse.json(funding)
  } catch (error) {
    console.error('Get funding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
