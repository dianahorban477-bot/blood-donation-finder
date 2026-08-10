import styles from './PrivacyPolicyPage.module.scss'

export const PrivacyPolicyPage = () => {
  return (
    <article
      className={styles.privacyPolicy}
      aria-labelledby="privacy-policy-title"
    >
      <header className={styles.privacyPolicy__header}>
        <p className={styles.privacyPolicy__eyebrow}>Legal information</p>
        <h1 className={styles.privacyPolicy__title} id="privacy-policy-title">
          Privacy Policy
        </h1>
      </header>

      <div className={styles.privacyPolicy__content}>
        <section className={styles.privacyPolicy__section}>
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how Blood Donor Finder Platform,
            operating the website, web application and related services,
            collects, uses, stores, shares and protects personal data.
          </p>
          <p>Blood Donor Finder is a digital platform designed to connect:</p>
          <ol>
            <li>individuals who may be interested in donating blood; and</li>
            <li>
              hospitals, blood centres and other authorised healthcare
              institutions that need to communicate blood-donation requirements.
            </li>
          </ol>
          <p>
            The platform provides account registration, access management and,
            as additional functionality becomes available, tools for discovering
            blood requests and communicating with participating hospitals.
          </p>
          <p>This Privacy Policy applies to:</p>
          <ol>
            <li>registered donors;</li>
            <li>hospital representatives;</li>
            <li>hospitals and blood centres using the platform;</li>
          </ol>
          <p>
            By creating an account or using the platform, users confirm that they
            have been given the opportunity to read this Privacy Policy. Merely
            reading or acknowledging this Privacy Policy does not constitute
            consent to every possible use of personal data.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>2. Who is responsible for your personal data?</h2>
          <p>
            For the personal-data processing described in this Privacy Policy,
            the controller is Blood Donor Finder Platform. In this Privacy Policy,
            “Platform,” “we,” “us” and “our” refer to Blood Donor Finder Platform.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>3. What the platform does</h2>
          <p>
            The purpose of the platform is to facilitate contact and communication
            between potential blood donors and participating hospitals or blood
            centres.
          </p>
          <p>The platform may allow:</p>
          <ol>
            <li>donors to create and manage donor accounts;</li>
            <li>hospitals to create institutional accounts;</li>
            <li>administrators to review hospital registrations;</li>
            <li>verified hospitals to publish blood-donation requests;</li>
            <li>
              donors to discover or receive information about relevant requests;
            </li>
            <li>donors to express interest in responding to a request;</li>
            <li>
              users to receive service notifications and, where separately
              accepted, marketing communications.
            </li>
          </ol>
          <p>
            The exact functionality available may change as the platform develops.
            We will update this Privacy Policy before introducing new processing
            purposes that materially affect users.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>4. The platform is not a blood-donation or healthcare provider</h2>
          <p>
            Blood Donor Finder Platform is an information, connection and
            communication platform. It is not a hospital, blood bank, blood
            collection service, laboratory, emergency service or healthcare
            provider.
          </p>
          <p>The platform does not:</p>
          <ol>
            <li>collect blood;</li>
            <li>perform blood donation;</li>
            <li>arrange or conduct transfusions;</li>
            <li>medically examine donors;</li>
            <li>determine whether a person is eligible to donate;</li>
            <li>
              verify whether self-reported blood-group information is medically
              accurate;
            </li>
            <li>test blood for infections or compatibility;</li>
            <li>store, transport, process or dispose of blood products;</li>
            <li>prescribe treatment or provide medical advice;</li>
            <li>
              guarantee that a hospital currently requires a particular blood
              group;
            </li>
            <li>
              guarantee that a registered donor will be accepted for donation;
            </li>
            <li>
              guarantee that a donation will be used for a specific patient;
            </li>
            <li>guarantee compatibility between a donor and a recipient;</li>
            <li>replace communication with qualified healthcare professionals.</li>
          </ol>
          <p>
            Registration as a donor, receipt of a notification or identification
            of a potentially relevant blood request does not mean that the donor
            is medically eligible to donate.
          </p>

          <h3>Responsibility of participating hospitals</h3>
          <p>
            The hospital or blood centre that receives or invites a donor is
            responsible for all medical and operational aspects of the donation
            process, including, where applicable:
          </p>
          <ol>
            <li>confirming that the blood request is genuine and current;</li>
            <li>providing accurate donation instructions;</li>
            <li>confirming the identity of the donor;</li>
            <li>assessing the donor’s medical eligibility;</li>
            <li>obtaining any required medical history;</li>
            <li>performing required examinations and laboratory testing;</li>
            <li>obtaining medical or procedural consent;</li>
            <li>determining compatibility;</li>
            <li>supervising the donor during and after collection;</li>
            <li>
              collecting, handling, testing, labelling, storing and transporting
              blood;
            </li>
            <li>managing adverse reactions or complications;</li>
            <li>
              complying with healthcare, blood-safety and professional
              requirements;
            </li>
            <li>protecting information collected directly by the hospital;</li>
            <li>
              responding to questions or complaints about the donation procedure.
            </li>
          </ol>
          <p>
            Any medical decision must be made by qualified healthcare personnel.
            The platform is not responsible for the medical acts, omissions,
            clinical decisions, facilities, personnel or donation procedures of
            participating hospitals. Nothing in this section limits the platform’s
            responsibility for its own legal obligations, including its
            responsibility for personal-data processing, platform security or
            conduct directly under its control.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>5. Relationship between the platform and hospitals</h2>
          <p>
            The platform is responsible for processing personal data required to:
          </p>
          <ol>
            <li>register and administer accounts;</li>
            <li>secure the platform;</li>
            <li>manage user roles and permissions;</li>
            <li>review hospital registrations;</li>
            <li>operate platform communication and matching functionality;</li>
            <li>send service communications;</li>
            <li>manage optional marketing preferences;</li>
            <li>provide technical support.</li>
          </ol>
          <p>
            A participating hospital may act as a separate controller for personal
            data it receives or collects for its own purposes, including:
          </p>
          <ol>
            <li>medical screening;</li>
            <li>appointment administration;</li>
            <li>donor assessment;</li>
            <li>blood collection;</li>
            <li>healthcare documentation;</li>
            <li>statutory record keeping;</li>
            <li>donation safety;</li>
            <li>medical follow-up.</li>
          </ol>
          <p>
            Once a hospital collects information directly from a donor or receives
            authorised information through the platform, the hospital’s own
            privacy notice may also apply.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>6. Current access to donor information</h2>
          <p>Under the current registration design:</p>
          <ol>
            <li>donor personal information is private;</li>
            <li>
              the donor and authorised platform administrators may access donor
              registration data;
            </li>
            <li>
              hospital users do not receive unrestricted access to the donor
              database;
            </li>
            <li>
              hospitals do not automatically receive donor contact information
              merely because they create a blood request.
            </li>
          </ol>
          <p>
            Before introducing functionality that transfers identifiable donor
            data to hospitals, we will define:
          </p>
          <ol>
            <li>which information is transferred;</li>
            <li>which hospital receives it;</li>
            <li>when the transfer occurs;</li>
            <li>the hospital’s responsibilities;</li>
            <li>how long the information is retained.</li>
          </ol>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>7. Personal data collected from donors</h2>

          <h3>7.1 Required donor registration data</h3>
          <p>When a donor creates an account, we collect:</p>
          <ol>
            <li>first name;</li>
            <li>last name;</li>
            <li>email address;</li>
            <li>password credentials;</li>
            <li>blood group;</li>
            <li>confirmation that the donor has read the Privacy Policy;</li>
            <li>
              explicit consent for the processing of blood-group information and
              other health-related data where consent is our legal basis;
            </li>
            <li>
              date, time and version of the relevant consent or acknowledgment.
            </li>
          </ol>
          <p>
            The password is processed for account authentication. It should be
            stored only in a cryptographically protected form and not as readable
            text. The “Confirm Password” entry is used to verify that the password
            was entered correctly. It is not retained as a separate account field
            after registration.
          </p>

          <h3>7.2 Optional donor registration data</h3>
          <p>A donor may also provide:</p>
          <ol>
            <li>telephone number;</li>
            <li>last donation date.</li>
          </ol>
          <p>
            The last donation date may be used to improve the relevance of
            donation information. It does not constitute a medical determination
            that the person is currently eligible to donate.
          </p>

          <h3>7.3 Donor account and activity information</h3>
          <p>As the donor uses the platform, we may process:</p>
          <ol>
            <li>account creation date;</li>
            <li>account status;</li>
            <li>user role;</li>
            <li>login history;</li>
            <li>marketing preferences;</li>
            <li>records of consents</li>
            <li>records of privacy-notice acknowledgments;</li>
            <li>records of blood requests viewed;</li>
            <li>responses to blood requests;</li>
            <li>service-notification history;</li>
            <li>account-deletion requests;</li>
          </ol>

          <h3>7.4 Health-related information</h3>
          <p>
            The following donor information may constitute data concerning health
            or otherwise sensitive information:
          </p>
          <ol>
            <li>blood group;</li>
            <li>last donation date;</li>
            <li>
              information indicating that a person has previously donated blood;
            </li>
            <li>responses to blood-donation requests;</li>
            <li>information concerning donation availability;</li>
            <li>
              future information relating to donor eligibility, where such
              functionality is introduced.
            </li>
          </ol>
          <p>
            Blood group and donation history will not be used for unrelated
            commercial advertising or disclosed to advertisers. Users should not
            upload or send detailed medical records, diagnoses, laboratory
            results, medication histories or other medical documents unless the
            platform provides a specifically designed and authorised feature for
            that purpose.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>8. Personal data collected from hospital representatives</h2>

          <h3>8.1 Required hospital-registration information</h3>
          <p>When a hospital representative registers an organisation, we collect:</p>
          <ol>
            <li>hospital or organisation name;</li>
            <li>institutional or work email address;</li>
            <li>password credentials;</li>
            <li>name of the contact person;</li>
            <li>telephone number;</li>
            <li>hospital address;</li>
            <li>selected Hospital role;</li>
            <li>acknowledgment of the Privacy Policy;</li>
            <li>
              date, time and version of the acknowledgment or consent.
            </li>
          </ol>
          <p>
            Although some information relates to the organisation, the contact
            person’s name, email address and telephone number are personal data.
          </p>

          <h3>8.2 Hospital account information</h3>
          <p>We also generate or process:</p>
          <ol>
            <li>internal hospital-account identifier;</li>
            <li>user and organisation role;</li>
            <li>registration date;</li>
            <li>verification status;</li>
            <li>default status of Pending Verification;</li>
            <li>administrator review history;</li>
            <li>date and outcome of verification;</li>
            <li>permissions assigned to the account;</li>
            <li>login and security logs;</li>
            <li>
              blood requests created by the hospital, when this feature is
              available;
            </li>
          </ol>

          <h3>8.3 Hospital verification</h3>
          <p>
            Hospital registration requires administrator approval before the
            institutional account becomes active.
          </p>
          <p>A newly created hospital account:</p>
          <ol>
            <li>receives the Hospital role;</li>
            <li>receives the status Pending Verification;</li>
            <li>cannot create blood-donation requests until approved;</li>
            <li>can be reviewed by authorised platform administrators.</li>
          </ol>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>9. Personal data collected automatically</h2>
          <p>When users access the platform, we may automatically collect:</p>
          <ol>
            <li>IP address;</li>
            <li>browser type and version;</li>
            <li>device type;</li>
            <li>operating system;</li>
            <li>application version;</li>
            <li>language and regional settings;</li>
            <li>approximate time zone;</li>
            <li>login date and time;</li>
            <li>failed-login attempts;</li>
            <li>session identifiers;</li>
            <li>authentication records;</li>
            <li>error and crash information;</li>
            <li>security-event information;</li>
            <li>functions or pages accessed;</li>
            <li>actions performed within the account;</li>
            <li>referring website or source, where applicable.</li>
          </ol>
          <p>
            This information is used to operate, secure and troubleshoot the
            platform.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>10. Information collected through communications</h2>
          <p>When a user contacts us, we may process:</p>
          <ol>
            <li>name;</li>
            <li>contact details;</li>
            <li>account identifier;</li>
            <li>hospital name;</li>
            <li>content of the request;</li>
            <li>related attachments;</li>
            <li>date and time of the communication;</li>
            <li>actions taken to respond;</li>
            <li>internal support notes.</li>
          </ol>
          <p>
            Users and hospital representatives must not include unnecessary
            patient-identifying information or detailed medical information in
            general support communications.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>11. Sources of personal data</h2>
          <p>We obtain personal data:</p>
          <ol>
            <li>directly from donors;</li>
            <li>directly from hospital representatives;</li>
            <li>from users’ devices and browsers;</li>
            <li>from platform activity and security systems;</li>
          </ol>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>12. Why we process personal data</h2>

          <h3>12.1 Account creation and administration</h3>
          <p>We process registration information to:</p>
          <ol>
            <li>create donor and hospital accounts;</li>
            <li>assign the appropriate user role;</li>
            <li>authenticate users;</li>
            <li>prevent duplicate email registration;</li>
            <li>administer accounts;</li>
            <li>provide account recovery;</li>
            <li>manage permissions;</li>
            <li>communicate important service information.</li>
          </ol>

          <h3>12.2 Processing blood group and donation information</h3>
          <p>
            We process a donor’s blood group and optional last donation date to:
          </p>
          <ol>
            <li>create a donor profile;</li>
            <li>support future matching with blood requests;</li>
            <li>provide donation-related functionality;</li>
            <li>improve the relevance of service notifications;</li>
            <li>help prevent obviously irrelevant notifications;</li>
            <li>enable communication requested by the donor.</li>
          </ol>
          <p>
            Because this information is health-related, where we rely on consent,
            we request explicit and purpose-specific consent before processing
            begins.
          </p>

          <h3>12.3 Hospital registration and verification</h3>
          <p>We process hospital information to:</p>
          <ol>
            <li>register the institution;</li>
            <li>create the institutional account;</li>
            <li>place the account in Pending Verification status;</li>
            <li>review the registration;</li>
            <li>contact the hospital representative;</li>
            <li>prevent impersonation or fraudulent registrations;</li>
            <li>approve, restrict, reject or suspend institutional accounts;</li>
            <li>assign appropriate permissions;</li>
            <li>protect donors and other platform users.</li>
          </ol>

          <h3>12.4 Platform security</h3>
          <p>We process technical, authentication and audit information to:</p>
          <ol>
            <li>prevent unauthorised access;</li>
            <li>investigate suspicious activity;</li>
            <li>detect abuse or fraud;</li>
            <li>enforce platform rules;</li>
            <li>maintain system availability;</li>
            <li>correct errors;</li>
            <li>protect users and participating institutions;</li>
            <li>establish, exercise or defend legal claims.</li>
          </ol>
          <p>
            This processing may be based on our legitimate interest in operating a
            secure and reliable platform.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>13. Marketing communications</h2>

          <h3>13.1 Optional marketing</h3>
          <p>
            Where a donor or hospital representative gives separate marketing
            consent, we may use limited contact information to send:
          </p>
          <ol>
            <li>platform news;</li>
            <li>information about new functionality;</li>
            <li>blood-donation awareness campaigns;</li>
            <li>information about community donation events;</li>
            <li>educational material;</li>
            <li>platform surveys;</li>
            <li>invitations to participate in platform initiatives;</li>
            <li>relevant updates from participating organisations;</li>
            <li>
              promotional communications concerning Blood Donor Finding Platform.
            </li>
          </ol>
          <p>
            Marketing consent is optional. Refusing marketing consent will not
            prevent a person from creating or using an account.
          </p>

          <h3>13.2 Information used for marketing</h3>
          <p>Subject to consent, we may process:</p>
          <ol>
            <li>first and last name;</li>
            <li>email address;</li>
            <li>optional telephone number;</li>
            <li>communication-language preference;</li>
            <li>marketing-channel preference;</li>
            <li>date and source of marketing consent;</li>
            <li>engagement with previous marketing communications;</li>
            <li>withdrawal or unsubscribe status.</li>
          </ol>

          <h3>13.3 Health information is excluded from commercial marketing</h3>
          <p>We will not use the following to target commercial advertising:</p>
          <ol>
            <li>blood group;</li>
            <li>last donation date;</li>
            <li>medical information;</li>
            <li>suspected donor eligibility;</li>
            <li>health status;</li>
            <li>
              information received from a hospital about a donation procedure.
            </li>
          </ol>
          <p>
            Donation reminders or alerts about relevant blood requests may be
            treated as service functionality rather than marketing where they are
            requested by the donor and necessary to provide the chosen service.
            Users will be able to manage these notifications separately from
            commercial marketing where technically possible.
          </p>

          <h3>13.4 Withdrawing from marketing</h3>
          <p>Users may withdraw marketing consent at any time by:</p>
          <ol>
            <li>changing preferences in account settings;</li>
            <li>replying to an SMS using the available opt-out method;</li>
            <li>contacting us by e-mail with the respective request.</li>
          </ol>
          <p>
            After withdrawal, we will stop sending marketing communications
            through the relevant channel. We may retain a minimal suppression
            record so that the user’s opt-out is respected. Where personal data is
            processed for direct marketing, GDPR gives the individual the right to
            object at any time, after which the information must no longer be
            processed for that purpose.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>14. How matching may work</h2>
          <p>
            Via blood-request functionality a participating hospital may submit
            information such as:
          </p>
          <ol>
            <li>requested blood group;</li>
            <li>hospital location;</li>
            <li>donation location;</li>
            <li>date or time period;</li>
            <li>degree of urgency;</li>
            <li>contact or appointment instructions;</li>
            <li>request status.</li>
          </ol>
          <p>
            The platform may compare this request with donor-profile information
            such as:
          </p>
          <ol>
            <li>self-reported blood group;</li>
            <li>optional last donation date;</li>
            <li>selected region or location, where implemented;</li>
          </ol>
          <p>A match means only that the request may be relevant to the donor.</p>
          <p>Matching does not:</p>
          <ol>
            <li>confirm medical eligibility;</li>
            <li>establish medical compatibility;</li>
            <li>constitute medical advice;</li>
            <li>require the donor to participate;</li>
            <li>guarantee that the hospital will accept the donor;</li>
            <li>guarantee that a donation is legally or medically possible.</li>
          </ol>
          <p>
            Unless future functionality is designed differently, matching is not
            intended to produce a solely automated decision having legal or
            similarly significant effects. The hospital independently makes all
            medical decisions.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>15. Information shared with hospitals</h2>
          <p>
            Under the current registration-stage design, hospital users do not
            have unrestricted access to donors’ personal profiles.
          </p>
          <p>
            Where future functionality enables a donor to respond to a request,
            the platform may share the minimum information necessary with the
            relevant hospital. Depending on the feature, this might include:
          </p>
          <ol>
            <li>donor name;</li>
            <li>contact details;</li>
            <li>self-reported blood group;</li>
            <li>response to a specific request;</li>
            <li>requested appointment information.</li>
          </ol>
          <p>Such sharing should occur only when:</p>
          <ol>
            <li>
              the donor takes an affirmative action, such as responding to a
              request;
            </li>
            <li>
              the sharing is necessary to provide functionality requested by the
              donor;
            </li>
            <li>
              the user has been clearly informed about the recipient and
              information disclosed;
            </li>
            <li>an appropriate legal basis applies.</li>
          </ol>
          <p>
            Information should not be made available to unrelated hospitals merely
            because a donor is registered.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>16. Hospital and administrator access</h2>
          <p>Hospital information is accessible only to:</p>
          <ol>
            <li>authorised representatives of that hospital;</li>
            <li>authorised platform administrators;</li>
            <li>authorised technical or support personnel where necessary.</li>
          </ol>
          <p>Donor registration information is accessible only to:</p>
          <ol>
            <li>the donor;</li>
            <li>authorised platform administrators;</li>
            <li>authorised technical or support personnel where necessary;</li>
          </ol>
          <p>
            Access should be limited according to user roles and job
            responsibilities.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>17. Data retention</h2>
          <p>
            We retain personal data only for as long as necessary for the relevant
            purpose, subject to legal, security and dispute-resolution
            requirements. Storage periods should be defined before the platform is
            launched because GDPR requires time-limited retention based on the
            purpose of processing.
          </p>
          <p>
            The following periods are placeholders and must be replaced with
            periods that the platform can actually implement:
          </p>
          <div className={styles.privacyPolicy__tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Information</th>
                  <th scope="col">Proposed retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Active donor account</td>
                  <td>For the duration of the account</td>
                </tr>
                <tr>
                  <td>Active hospital account</td>
                  <td>For the duration of the account</td>
                </tr>
                <tr>
                  <td>Blood group and last donation date</td>
                  <td>
                    Until account deletion, health-data consent withdrawal or
                    expiry under the retention schedule
                  </td>
                </tr>
                <tr>
                  <td>Inactive donor account</td>
                  <td>[X months/years] after the last account activity</td>
                </tr>
                <tr>
                  <td>Pending hospital registration</td>
                  <td>
                    [X days/months] after registration if verification is not
                    completed
                  </td>
                </tr>
                <tr>
                  <td>Rejected hospital application</td>
                  <td>[X months] after rejection</td>
                </tr>
                <tr>
                  <td>Closed or deleted account</td>
                  <td>
                    Deleted or anonymised within [X days], except information
                    required for another lawful purpose
                  </td>
                </tr>
                <tr>
                  <td>Marketing contact information</td>
                  <td>
                    Until consent withdrawal or [X months] after the last marketing
                    interaction
                  </td>
                </tr>
                <tr>
                  <td>Legal-claim information</td>
                  <td>Until the relevant limitation period has expired</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Withdrawal of marketing consent does not automatically require
            deletion of the entire donor account.
          </p>
          <p>
            Withdrawal of explicit consent for health-data processing may require
            us to delete or restrict the donor profile if blood-group processing
            is essential to the service.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>18. Data accuracy</h2>
          <p>
            Donors are responsible for ensuring that self-reported information is
            accurate and updated.
          </p>
          <p>The platform does not independently verify:</p>
          <ol>
            <li>a donor’s blood group;</li>
            <li>the date of the donor’s last donation;</li>
            <li>the donor’s current health;</li>
            <li>the donor’s medical eligibility.</li>
          </ol>
          <p>
            A hospital must independently confirm all medically relevant
            information before permitting a donation.
          </p>
          <p>Hospital representatives are responsible for ensuring that:</p>
          <ol>
            <li>organisation details are accurate;</li>
            <li>the contact person is authorised;</li>
            <li>requests published through the platform are genuine;</li>
            <li>blood-request details remain current;</li>
            <li>fulfilled or cancelled requests are closed promptly.</li>
          </ol>
          <p>
            Users can update incorrect account information through their profile or
            by contacting us via e-mail.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>19. Security</h2>
          <p>
            We use technical and organisational measures designed to protect
            personal data against:
          </p>
          <ol>
            <li>unauthorised access;</li>
            <li>unlawful use;</li>
            <li>accidental loss;</li>
            <li>alteration;</li>
            <li>disclosure;</li>
            <li>destruction.</li>
          </ol>
          <p>
            Depending on the final implementation, these measures may include:
          </p>
          <ol>
            <li>encryption during transmission;</li>
            <li>secure password hashing;</li>
            <li>role-based permissions;</li>
            <li>administrative access restrictions;</li>
            <li>
              multifactor authentication for administrative or hospital accounts;
            </li>
            <li>database access controls;</li>
            <li>security logging;</li>
            <li>backups;</li>
            <li>vulnerability management;</li>
            <li>software-update procedures;</li>
            <li>staff confidentiality obligations;</li>
            <li>incident-response procedures;</li>
            <li>regular access reviews.</li>
          </ol>
          <p>
            No online system can be guaranteed to be completely secure. Users must
            protect their login credentials and must not share passwords with
            unauthorised persons.
          </p>
          <p>
            Users should notify us promptly by e-mail if they suspect unauthorised
            access to their account.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>19. Personal-data breaches</h2>
          <p>Where we become aware of a personal-data breach, we will:</p>
          <ol>
            <li>investigate the incident;</li>
            <li>take reasonable steps to contain it;</li>
            <li>assess the risks to affected persons;</li>
            <li>document the incident;</li>
            <li>
              notify the competent supervisory authority where legally required;
            </li>
            <li>notify affected individuals where legally required;</li>
            <li>implement corrective measures.</li>
          </ol>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>20. User rights</h2>
          <p>
            Depending on the applicable law and legal basis, users may have the
            right to:
          </p>
          <ol>
            <li>receive information about how their data is processed;</li>
            <li>request access to their personal data;</li>
            <li>receive a copy of their personal data;</li>
            <li>correct inaccurate or incomplete information;</li>
            <li>request deletion;</li>
            <li>request restriction of processing;</li>
            <li>object to processing based on legitimate interests;</li>
            <li>object at any time to direct marketing;</li>
            <li>withdraw consent;</li>
            <li>
              receive certain data in a structured, commonly used and
              machine-readable format;
            </li>
            <li>
              request transfer of eligible data to another controller where
              technically feasible;
            </li>
            <li>lodge a complaint with a competent supervisory authority;</li>
            <li>obtain information about international-transfer safeguards;</li>
            <li>
              receive information about qualifying automated decision-making.
            </li>
          </ol>
          <p>
            These rights are subject to the conditions and exceptions established
            by applicable law. GDPR rights include access, correction, deletion,
            restriction, portability and objection, including an unconditional
            objection to direct marketing.
          </p>
          <p>Requests may be submitted to our e-mail address.</p>
          <p>
            We may need to verify the requester’s identity before responding.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>21. Children and age requirements</h2>
          <p>
            The platform is intended for persons who satisfy the minimum age of 18
            years old. The platform does not itself determine whether the user
            satisfies the medical age requirements for blood donation. The
            participating hospital is responsible for confirming eligibility. We
            do not knowingly collect personal data from children who cannot
            lawfully create an account. Where such an account is identified, we
            may suspend it and delete the information, subject to applicable law.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>22. Cookies and similar technologies</h2>
          <p>
            The platform may use cookies, local storage, software development kits
            and similar technologies for:
          </p>
          <ol>
            <li>login sessions;</li>
            <li>account security;</li>
            <li>remembering preferences;</li>
            <li>preventing fraud;</li>
            <li>measuring technical performance;</li>
            <li>identifying errors;</li>
            <li>analysing platform usage;</li>
            <li>managing communication preferences.</li>
          </ol>
          <p>
            Strictly necessary technologies may be used to operate and secure the
            platform.
          </p>
          <p>
            Non-essential analytics or advertising technologies will be used only
            where permitted and, where required, after consent.
          </p>
          <p>
            Detailed information should be provided in a separate Cookie Notice
            before non-essential tracking is introduced.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>23. Changes to this Privacy Policy</h2>
          <p>We may update this Privacy Policy when:</p>
          <ol>
            <li>platform functionality changes;</li>
            <li>new data categories are introduced;</li>
            <li>hospitals gain new access to donor information;</li>
            <li>matching or messaging functionality changes;</li>
            <li>service providers change;</li>
            <li>legal or regulatory requirements change;</li>
            <li>new marketing or analytics functionality is introduced.</li>
          </ol>
          <p>
            We will display the updated version and revise the “Last updated” date.
          </p>
          <p>
            Where a material change affects users, we may provide notice through:
          </p>
          <ol>
            <li>email;</li>
            <li>an in-app notification;</li>
            <li>an account notice;</li>
            <li>another appropriate channel.</li>
          </ol>
          <p>
            Where the new processing requires consent, we will request new consent
            before beginning that processing.
          </p>
        </section>

        <section className={styles.privacyPolicy__section}>
          <h2>24. Complaints</h2>
          <p>
            In case of issues with the hospital, users may first contact us by
            email so that we can investigate their concern. Where GDPR applies,
            users may also lodge a complaint with the supervisory authority in the
            country where they live, work or believe an infringement occurred.
          </p>
        </section>
      </div>
    </article>
  )
}
