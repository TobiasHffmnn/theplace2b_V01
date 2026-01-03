'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans relative overflow-hidden font-manrope">
      
      {/* obere Zeile - Logo & Menü */}
      <header className="flex justify-between items-center p-6 border-b border-neutral-300">
        <div className="text-3xl font-bold tracking-wide uppercase">theplace2b</div>
        <nav className="space-x-6 font-semibold uppercase text-sm">
          <Link href="#angebote" className="hover:text-pink-500 transition">angebote</Link>
          <Link href="#texte" className="hover:text-pink-500 transition">texte</Link>
          <Link href="#ueber-mich" className="hover:text-pink-500 transition">über mich</Link>
          <Link href="#kontakt" className="hover:text-pink-500 transition">kontakt</Link>
        </nav>
      </header>

      {/* Hero Sektion */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gray-50 relative z-10">
        {/* Große Überschrift */}
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase mb-4 leading-tight tracking-wide text-black">
          the place to feel<br/>
          the place to accept<br/>
          the place to act
        </h1>
        {/* Untertitel */}
        <div className="mt-8 text-2xl md:text-3xl font-bold max-w-2xl mx-auto text-black/80">
          # Impulse | Workshops | Beratung für Einzelpersonen & Teams
        </div>
        {/* Kleinere Beschreibung */}
        <p className="mt-6 max-w-2xl text-lg text-gray-700">
          Psychologisch fundiert mit Fokus auf<br/> 
          - Psychologischer Flexibilität (aus ACT)<br/>
          - Psychologischer Sicherheit<br/>
          - Emotionale und Soziale Kompetenzen<br/>
          - Embodiment & Movement
        </p>
        {/* Einladung */}
        <p className="mt-6 max-w-3xl text-lg font-semibold italic text-gray-800 text-center">
          Ich lade dazu ein, dem Unangenehmen neugierig zu begegnen und nach eigenen Werten zu handeln als Grundlage für bewusste Entscheidungen, klare Zusammenarbeit und ein erfülltes Leben.
        </p>
        {/* Buttons */}
        <div className="mt-8 flex space-x-4">
          <a href="mailto:deine@email.de" className="bg-black text-white px-6 py-3 rounded-xl font-semibold uppercase hover:bg-gray-800 transition">Anfrage senden</a>
          <a href="#angebote" className="border-2 border-black px-6 py-3 rounded-xl font-semibold uppercase hover:bg-black hover:text-white transition">Angebote ansehen</a>
        </div>
      </section>

      {/* Angebote Abschnitt */}
      <section id="angebote" className="px-4 py-16 bg-white border-t border-neutral-200">
        <h2 className="text-4xl font-bold text-center mb-8"># Angebote</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Angebot 1 */}
          <div className="border border-neutral-300 rounded-2xl p-6 hover:shadow-xl transition cursor-pointer" onClick={() => window.location.href='/angebote/impulse'}>
            <h3 className="text-xl font-bold mb-2">Impulse</h3>
            <p className="text-gray-600 mb-2">Datum, Ort, kurze Beschreibung</p>
          </div>
          
          'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans relative overflow-hidden font-manrope">
      
      {/* obere Zeile - Logo & Menü */}
      <header className="flex justify-between items-center p-6 border-b border-neutral-300">
        <div className="text-3xl font-bold tracking-wide uppercase">theplace2b</div>
        <nav className="space-x-6 font-semibold uppercase text-sm">
          <Link href="#angebote" className="hover:text-pink-500 transition">angebote</Link>
          <Link href="#texte" className="hover:text-pink-500 transition">texte</Link>
          <Link href="#ueber-mich" className="hover:text-pink-500 transition">über mich</Link>
          <Link href="#kontakt" className="hover:text-pink-500 transition">kontakt</Link>
        </nav>
      </header>

      {/* Hero Sektion */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gray-50 relative z-10">
        {/* Große Überschrift */}
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase mb-4 leading-tight tracking-wide text-black">
          the place to feel<br/>
          the place to accept<br/>
          the place to act
        </h1>
        {/* Untertitel */}
        <div className="mt-8 text-2xl md:text-3xl font-bold max-w-2xl mx-auto text-black/80">
          # Impulse | Workshops | Beratung für Einzelpersonen & Teams
        </div>
        {/* Kleinere Beschreibung */}
        <p className="mt-6 max-w-2xl text-lg text-gray-700">
          Psychologisch fundiert mit Fokus auf<br/> 
          - Psychologischer Flexibilität (aus ACT)<br/>
          - Psychologischer Sicherheit<br/>
          - Emotionale und Soziale Kompetenzen<br/>
          - Embodiment & Movement
        </p>
        {/* Einladung */}
        <p className="mt-6 max-w-3xl text-lg font-semibold italic text-gray-800 text-center">
          Ich lade dazu ein, dem Unangenehmen neugierig zu begegnen und nach eigenen Werten zu handeln als Grundlage für bewusste Entscheidungen, klare Zusammenarbeit und ein erfülltes Leben.
        </p>
        {/* Buttons */}
        <div className="mt-8 flex space-x-4">
          <a href="mailto:deine@email.de" className="bg-black text-white px-6 py-3 rounded-xl font-semibold uppercase hover:bg-gray-800 transition">Anfrage senden</a>
          <a href="#angebote" className="border-2 border-black px-6 py-3 rounded-xl font-semibold uppercase hover:bg-black hover:text-white transition">Angebote ansehen</a>
        </div>
      </section>

      {/* Angebote Abschnitt */}
      <section id="angebote" className="px-4 py-16 bg-white border-t border-neutral-200">
        <h2 className="text-4xl font-bold text-center mb-8"># Angebote</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Angebot 1 */}
          <div className="border border-neutral-300 rounded-2xl p-6 hover:shadow-xl transition cursor-pointer" onClick={() => window.location.href='/angebote/impulse'}>
            <h3 className="text-xl font-bold mb-2">Impulse</h3>
            <p className="text-gray-600 mb-2">Datum, Ort, kurze Beschreibung</p>
          </div>
          
          {/* Angebot 2 */}
         

         
