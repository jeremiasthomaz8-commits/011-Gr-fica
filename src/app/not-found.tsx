import Link from 'next/link';
export default function NotFound(){return <div className="container empty-state"><h1>Essa página não está por aqui.</h1><p>Que tal encontrar uma nova ideia no catálogo?</p><Link href="/produtos" className="button button-red">Explorar produtos</Link></div>}
