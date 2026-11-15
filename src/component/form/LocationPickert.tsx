// @/component/form/LocationPicker.tsx
'use client'

import LocationPickerMap from '@/component/form/LocationPickerMap.tsx'

type Props = {
    latitude?: string | number | null
    longitude?: string | number | null
    /** Dipanggil saat user klik peta. Nilai dikirim sebagai string (6 desimal) agar cocok dengan input form. */
    onChange: (latitude: string, longitude: string) => void
    height?: number
    /** Default: Denpasar, Bali */
    center?: [number, number]
    zoom?: number
}

export default function LocationPicker({
    latitude,
    longitude,
    onChange,
    height = 350,
    center = [-8.6705, 115.2126],
    zoom = 13,
}: Props) {
    const lat = parseFloat(String(latitude ?? ''))
    const lng = parseFloat(String(longitude ?? ''))

    return (
        <div className="mb-3 rounded-3 overflow-hidden border border-neutral-400">
            <LocationPickerMap
                lat={Number.isNaN(lat) ? null : lat}
                lng={Number.isNaN(lng) ? null : lng}
                onPick={(newLat, newLng) =>
                    onChange(newLat.toFixed(6), newLng.toFixed(6))
                }
                center={center}
                zoom={zoom}
                height={height}
            />
        </div>
    )
}
