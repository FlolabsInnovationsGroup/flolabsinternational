'use client'

import { useEffect, useRef } from 'react'

interface HubSpotFormProps {
  portalId?: string
  formId: string
  region?: string
  targetId?: string
}

export function HubSpotForm({
  portalId = '45023159',
  formId,
  region = 'na1',
  targetId = 'hubspot-form',
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Wait for HubSpot script to load
    const checkAndCreateForm = () => {
      if (typeof window !== 'undefined' && (window as any).hbspt) {
        ;(window as any).hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#${targetId}`,
        })
      } else {
        // Retry after a short delay if script isn't loaded yet
        setTimeout(checkAndCreateForm, 100)
      }
    }

    checkAndCreateForm()
  }, [portalId, formId, region, targetId])

  return <div id={targetId} ref={formRef} className="hubspot-form-container" />
}
