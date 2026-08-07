import './AboutPage.scss';

const AUTHORS = [
  { handle: 'DanielLopezCS', href: 'https://github.com/DanielLopezCS' },
  { handle: 'davide-ravasi', href: 'https://github.com/davide-ravasi' },
  { handle: 'ljgpok', href: 'https://github.com/ljgpok' },
  { handle: 'theborgh', href: 'https://github.com/theborgh' },
] as const;

export default function AboutPage() {
  return (
    <main id='main-content' className='page'>
      <div className='page__content-wrapper about'>
        <h1 className='page__title'>About Track&apos;em All</h1>

        <section className='about__section'>
          <h2 className='page__h2'>What it is</h2>
          <p>
            Track&apos;em All helps you discover TV shows and keep track of what
            you&apos;re watching so you don&apos;t miss an episode.
          </p>
        </section>

        <section className='about__section'>
          <h2 className='page__h2'>Credits</h2>
          <ul className='about__credits'>
            {AUTHORS.map(({ handle, href }) => (
              <li key={handle}>
                <a href={href} target='_blank' rel='noopener noreferrer'>
                  @{handle}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className='about__section'>
          <h2 className='page__h2'>Data source</h2>
          <p>
            This product uses the{' '}
            <a
              href='https://www.themoviedb.org/'
              target='_blank'
              rel='noopener noreferrer'
            >
              The Movie Database (TMDB) API
            </a>{' '}
            but is not endorsed or certified by TMDB.
          </p>
        </section>

        <section className='about__section'>
          <h2 className='page__h2'>Source code</h2>
          <p>
            The project lives at{' '}
            <a
              href='https://github.com/davide-ravasi/track-em-all'
              target='_blank'
              rel='noopener noreferrer'
            >
              track-em-all on GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
