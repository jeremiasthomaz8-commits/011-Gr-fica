import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', images: { unoptimized: true }, trailingSlash: true, env: { NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER: process.env.WHATSAPP_BUSINESS_NUMBER || '' } };
export default config;
