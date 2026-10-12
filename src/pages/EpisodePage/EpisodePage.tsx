import { useLocation } from 'react-router-dom';
import { getUrlImages, padNumber } from '../../utils';
import { EpisodeProps, Actor } from '../../typescript/types';
import Loader from '../../components/Loader/Loader';
import './EpisodePage.scss';
import PersonCard from '../../components/PersonCard/PersonCard';
import PhotoList from '../../components/PhotoList/PhotoList';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

export default function EpisodePage() {
  const location = useLocation<EpisodeProps>();
  const {
    season_number,
    episode_number,
    overview,
    air_date,
    still_path,
    name,
    showId,
  } = location.state;

  const castUrl = `${
    import.meta.env.VITE_BASE_TVSHOW_URL
  }${showId}/season/${season_number}/episode/${episode_number}/credits?api_key=${
    import.meta.env.VITE_API_KEY
  }`;
  const imagesUrl = `${
    import.meta.env.VITE_BASE_TVSHOW_URL
  }${showId}/season/${season_number}/episode/${episode_number}/images?api_key=${
    import.meta.env.VITE_API_KEY
  }`;

  const {
    data: castData,
    error: castError,
    isLoading: isLoadingCast,
  } = useQuery({
    queryKey: ['episode-cast', showId, season_number, episode_number],
    queryFn: async () => {
      const res = await fetch(castUrl);
      if (!res.ok) throw new Error('Failed to fetch cast');
      return res.json();
    },
  });

  const {
    data: imagesData,
    error: imagesError,
    isLoading: isLoadingImages,
  } = useQuery({
    queryKey: ['episode-images', showId, season_number, episode_number],
    queryFn: async () => {
      const res = await fetch(imagesUrl);
      if (!res.ok) throw new Error('Failed to fetch images');
      return res.json();
    },
  });

  const websiteBase = (
    import.meta.env.VITE_WEBSITE_BASE_URL || 'https://trackem-all.netlify.app'
  ).replace(/\/$/, '');

  const rawOverview = overview?.trim() ?? '';
  const episodeCode =
    season_number != null && episode_number != null
      ? `S${padNumber(season_number)}E${padNumber(episode_number)}`
      : null;
  const metaDescription =
    rawOverview.length === 0
      ? name && episodeCode
        ? `${episodeCode} · ${name} on Track'em All.`
        : name
          ? `${name} on Track'em All.`
          : episodeCode
            ? `${episodeCode} on Track'em All.`
            : "Track TV shows with Track'em All."
      : rawOverview.length <= 160
        ? rawOverview
        : `${rawOverview.slice(0, 157).trimEnd()}...`;

  const pageTitle = name ? `${name} | Track'em All` : "Episode | Track'em All";
  const canonicalUrl = `${websiteBase}/episode/${episode_number}`;
  const ogImage =
    getUrlImages('big', still_path) ||
    'https://trackem-all.netlify.app/og-image.png';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel='canonical' href={canonicalUrl} />
        <meta name='description' content={metaDescription} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={metaDescription} />
        <meta property='og:image' content={ogImage} />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={metaDescription} />
        <meta name='twitter:image' content={ogImage} />
        <meta
          name='twitter:image:alt'
          content={name ? String(name) : "Track'em All"}
        />
      </Helmet>
      <main id='main-content' className='page'>
        <div className='page__content-wrapper'>
          {(castError || imagesError) && (
            <div className='loading-error' role='alert'>
              {castError?.message ?? imagesError?.message}
            </div>
          )}
          {(isLoadingCast || isLoadingImages) && (
            <div
              className='loader'
              aria-live='polite'
              aria-atomic='true'
              role='status'
              aria-label='Loading cast and photos'
            >
              <Loader aria-hidden='true' aria-busy='true' />
            </div>
          )}
          <h1 className='page__title'>{name}</h1>
          <img
            alt={`${name} still`}
            src={getUrlImages('big', still_path)}
            width='100%'
          />
          <h2 className='episode_number'>
            S{padNumber(season_number)}E{padNumber(episode_number)}
          </h2>
          <h3 className='episode_airdate'>Air date: {air_date}</h3>
          <p className='episode_overview'>{overview}</p>

          <section aria-labelledby='cast' data-testid='section-cast'>
            <h2 id='cast'>CAST</h2>
            <div className='cast_container'>
              {castData &&
                castData.cast &&
                castData.cast.map((actor: Actor) => (
                  <PersonCard key={actor.id} person={actor} />
                ))}
            </div>
          </section>

          <section aria-labelledby='photos' data-testid='section-photos'>
            {imagesData?.stills && <PhotoList imagesData={imagesData.stills} />}
          </section>

          {/* <h3 className="page__h2">PHOTOS</h3>
        <div className="photos_container">
          {imagesData &&
            imagesData.stills &&
            imagesData.stills.map((photo) => (
              <a
                href={getUrlImages("big", photo.file_path)}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  key={photo.file_path}
                  alt={photo.file_path}
                  src={getUrlImages("thumb", photo.file_path)}
                />
              </a>
            ))}
        </div> */}
        </div>
      </main>
    </>
  );
}
