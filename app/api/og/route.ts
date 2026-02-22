import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { profile } from '@/data/profile'
import { DEFAULT_LOCALE } from '@/lib/i18n-config'
import { absoluteUrl } from '@/lib/site'

export const runtime = 'edge'
export const alt = 'André Nicolas Heidemann – Digital Transformation Analyst'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

const basics = profile.basics.translations[DEFAULT_LOCALE]
const profileImage = absoluteUrl('/profile-img.jpeg')

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const headline = searchParams.get('headline') ?? basics.headline
  const cta = searchParams.get('cta') ?? 'View the full portfolio'

  return new ImageResponse(
    (
      <div
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          backgroundImage: 'linear-gradient(135deg, #020617 0%, #0f172a 55%, #1d263b 100%)',
          color: '#f8fafc',
          fontFamily: 'Inter, "Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif',
          padding: '64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: '640px',
            gap: '32px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: 32, letterSpacing: 8, textTransform: 'uppercase', color: '#38bdf8' }}>
              {basics.name}
            </span>
            <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{headline}</span>
            <span style={{ fontSize: 28, color: '#cbd5f5', lineHeight: 1.4 }}>
              Bridging OT ↔ IT with PLC integrations, SAP PCo, and industrial automation.
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: 28,
              color: '#94a3b8',
            }}
          >
            <div
              style={{
                backgroundColor: '#38bdf8',
                color: '#0f172a',
                padding: '18px 40px',
                borderRadius: 999,
                fontWeight: 600,
              }}
            >
              {cta}
            </div>
            <span style={{ fontSize: 22 }}>andreheidemann.com</span>
          </div>
        </div>
        <div
          style={{
            width: '360px',
            height: '360px',
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(56,189,248,0.25), transparent 65%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(148, 163, 184, 0.4)',
          }}
        >
          <img
            src={profileImage}
            alt={alt}
            width={320}
            height={320}
            style={{
              width: '320px',
              height: '320px',
              objectFit: 'cover',
              borderRadius: '999px',
              border: '4px solid rgba(15,23,42,0.6)',
              boxShadow: '0 25px 60px rgba(15, 15, 35, 0.9)',
            }}
          />
        </div>
      </div>
    ),
    size,
  )
}
