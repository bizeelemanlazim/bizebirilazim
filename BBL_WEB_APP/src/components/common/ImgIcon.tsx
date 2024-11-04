import React from 'react'

type ImgIconProps = {
  src?: string
  alt?: string
  style?: React.CSSProperties
}

export default function ImgIcon({ src, alt, style }: ImgIconProps) {
  return (
    <img
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      src={src}
      alt={alt}
    />
  )
}
