// @/component/form/LocationPickerMap.tsx
'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Icon pin default Leaflet (diambil dari CDN agar tidak bermasalah saat bundling)
const pinIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

type Props = {
    lat: number | null
    lng: number | null
    onPick: (lat: number, lng: number) => void
    center: [number, number]
    zoom: number
    height: number
}

// Menangkap klik pada peta
function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onPick(e.latlng.lat, e.latlng.lng)
        },
    })
    return null
}

// Geser peta jika pin berada di luar area yang terlihat
function Recenter({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap()

    useEffect(() => {
        if (!map.getBounds().contains([lat, lng])) {
            map.setView([lat, lng], map.getZoom())
        }
    }, [lat, lng, map])

    return null
}

export default function LocationPickerMap({ lat, lng, onPick, center, zoom, height }: Props) {
    const hasPin = typeof lat === 'number' && typeof lng === 'number'

    return (
        <MapContainer
            center={hasPin ? [lat, lng] : center}
            zoom={zoom}
            scrollWheelZoom
            style={{ height, width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickHandler onPick={onPick} />

            {hasPin && (
                <>
                    <Marker position={[lat, lng]} icon={pinIcon} />
                    <Recenter lat={lat} lng={lng} />
                </>
            )}
        </MapContainer>
    )
}