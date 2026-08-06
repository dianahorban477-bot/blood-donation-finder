import { Link } from 'react-router'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.hero__inner}>
          <div className={styles.hero__content}>
            <p className={styles.hero__eyebrow}>A clearer path to helping</p>
            <h1 className={styles.hero__title}>
              Helping hospitals and blood donors find each other
            </h1>
            <p className={styles.hero__description}>
              A focused platform built to help verified medical institutions connect with people
              who are ready to explore blood donation.
            </p>
            <div className={styles.hero__actions}>
              <Link className={styles.hero__donorLink} to="/register/donor">
                Register as a donor
              </Link>
              <Link className={styles.hero__hospitalLink} to="/register/hospital">
                Register a hospital
              </Link>
            </div>
          </div>

          <div className={styles.hero__media} aria-hidden="true" />
        </div>
      </section>

      <section className={styles.about} id="about-us" aria-labelledby="about-title">
        <div className={styles.container}>
          <p className={styles.heading__eyebrow}>About us</p>
          <h2 className={styles.heading__title} id="about-title">
            A clearer connection between donors and hospitals
          </h2>
          <p className={styles.heading__description}>
            Blood Donation Finder is being created to help people who want to donate connect with
            verified medical institutions. Our goal is to make future blood request coordination
            easier to understand, more transparent, and centered on responsible medical guidance.
          </p>
        </div>
      </section>

      <section
        className={styles.info}
        id="donor-info"
        aria-labelledby="donor-info-title"
      >
        <div className={styles.container}>
          <p className={styles.heading__eyebrow}>Donor information</p>
          <h2 className={styles.heading__title} id="donor-info-title">
            Who can be a donor
          </h2>

          <div className={styles.info__content}>
            <div className={styles.info__details}>
              <p>
                Examinations are carried out according to the established procedure. Their results
                must confirm that there are no grounds for permanent or temporary deferral from
                donation.
              </p>
              <p>
                During the examination, the donor takes part in an interview and receives
                comprehensive information about the donation process.
              </p>
              <p>
                The donor provides written consent to the collection of blood or blood components
                and, where necessary, to the use of supporting medical technologies.
              </p>
              <p>
                A person wishing to donate may contact any blood system establishment regardless
                of their registered place of residence.
              </p>
            </div>

            <div className={styles.info__criteria}>
              <article className={styles.card}>
                <p className={styles.card__label}>Minimum donor age</p>
                <p className={styles.card__value}>18 <span>years</span></p>
                <p className={styles.card__text}>
                  Anyone aged 18 or older who wishes to give blood may be a donor. For first-time
                  donors over 60, a physician makes the decision based on examination results.
                  Donors over 65 may donate with a physician’s approval at every visit.
                </p>
              </article>
              <article className={styles.card}>
                <p className={styles.card__label}>Minimum donor weight</p>
                <p className={styles.card__value}>50 <span>kg</span></p>
                <p className={styles.card__text}>
                  Donors of whole blood or blood components collected through apheresis must weigh
                  at least 50 kg.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
