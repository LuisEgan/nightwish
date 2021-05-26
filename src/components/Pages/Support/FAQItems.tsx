/* eslint-disable */
import Link from "next/link";
import { ROUTES } from "../../../lib/constants";
import { IAccordionItem } from "./Accordion";

const ELink = ({ url }: { url: string }) => (
  <a
    className="underline"
    href={`https://${url}`}
    target="_blank"
    rel="noreferrer"
  >
    {url}
  </a>
);

const FAQItems: IAccordionItem[] = [
  {
    title: "What time will the shows start?",
    description: (
      <>
        <b>On Friday</b> the show will start: Europe: 9pm EEST (Finland) (UTC+3)
        / 8pm CEST (UTC+2) / 7pm BST (UTC+1) North and South America: 2pm ET
        (UTC-4) / 11am PT (UTC -7) / 3pm BRT (UTC-3) / 1pm CT (UTC -5) Asia and
        Australia: Sat, May 29, 2021, 2am CST (UTC+8) / 3am JST (UTC+9) / 4am
        AEST (UTC+10)
        <br />
        <br />
        <b>On Saturday</b> the show will start: North and South America: 8pm ET
        (UTC-4) / 5pm PT (UTC -7) / 9pm BRT (UTC-3) / 7pm CT (UTC -5) Europe:
        Sun, May 30, 2021: 3am EEST (Finland) (UTC+3) / 2am CEST (UTC+2) / 1am
        BST (UTC+1) Asia and Australia: Sun, May 30, 2021, 8am CST (UTC+8) / 9am
        JST (UTC+9) / 10am AEST (UTC+10).
      </>
    ),
  },

  {
    title:
      "What time will the VIP virtual session which is included to the VIP ticket start?",
    description: (
      <>
        <b>On Friday</b> the VIP virtual session will start: Europe: 8pm EEST
        (Finland) (UTC+3) / 7pm CEST (UTC+2) / 6pm BST (UTC+1) North and South
        America: 1pm ET (UTC-4) / 10am PT (UTC -7) / 2pm BRT (UTC-3) / 12 noon
        CT (UTC -5) Asia and Australia: Sat, May 29, 2021, 1am CST (UTC+8) / 2am
        JST (UTC+9) / 3am AEST (UTC+10) <br />
        <br />
        <b>On Saturday</b> the VIP virtual session will start: North and South
        America: 7pm ET (UTC-4) / 4pm PT (UTC -7) / 8pm BRT (UTC-3) / 6pm CT
        (UTC -5) Europe: Sun, May 30, 2021: 2am EEST (Finland) (UTC+3) / 1am
        CEST (UTC+2) / 12 midnight BST (UTC+1) // Asia and Australia: Sun, May
        30, 2021, 7am CST (UTC+8) / 8am JST (UTC+9) / 9am AEST (UTC+10) <br />
        <br />
        VIP virtual session cannot be watched afterwards. <br />
        VIP virtual session can be watched with the following ticket types: VIP
        Europe, VIP Europe upgrade, VIP World, VIP World upgrade.
      </>
    ),
  },

  {
    title: "When can I access the platform?",
    description:
      "The platform will open 24 hours before the start of the show. During the pre-show time you will be able to interact with other fans by using the chat and get familiar with the features of the platform. We recommend you to access the platform well in advance so you will avoid the potential congestion with the login.",
  },

  {
    title: "How can I register my ticket and access the event?",
    description: (
      <>
        Registration of purchased tickets will open latest 24 hours before the
        first show. <br />
        <br />
        You can register your ticket in two ways: <br />
        <br />
        <ol className="list-decimal">
          <li>
            <b>Personal web address</b> <br />
            <ol className="list-decimal">
              <li>
                Your official ticket has the personal web address
                www.burst.fi/nightwish/yourticketcode. You can find it in your
                ticket next to the text "Login here".
              </li>
              <li>
                You can click on it or copy and paste it to the address bar of
                your browser.{" "}
              </li>
              <li>
                It will direct you to the streaming platform. If the platform is
                not yet open, a text on screen will guide you to wait.{" "}
              </li>
              <li>
                On the platform you are requested to add your email address and
                create a password. After that your ticket is registered and
                linked to your account.{" "}
              </li>
              <li>
                From then on you can log in just by using your email address and
                your password.
              </li>
            </ol>
          </li>
          <br />
          <li>
            <b>Ticket code</b>

            <ol className="list-decimal">
              <li>
                You can also register your ticket by using the ticket code. Go
                to <ELink url="www.burst.fi/nightwish" />
              </li>
              <li>
                Create an account by adding your email address and creating a
                password.
              </li>
              <li>
                After this you are requested to register your ticket code.
              </li>
              <li>
                Copy your ticket code from your ticket. (You can find your
                ticket code on your ticket next to the text "Your ticket code".
                The ticket code starts with numbers 00.)
              </li>
            </ol>
          </li>
        </ol>{" "}
        <br />
        <br />
        If you have bought several ticket types (for example Two evening ticket
        and VIP Europe upgrade), you will have to register both ticket codes in
        order to watch the shows and the virtual session. <br />
        <br />
        After registering all your tickets, you can see the events active on the
        upcoming events list. Please note that if the status of some of the
        events reads "Buy ticket", you do not have access to said event and will
        need to register or buy the corresponding ticket. If you already have a
        ticket that should grant you the access to that event, please check that
        you have registered all your tickets.
      </>
    ),
  },

  {
    title: "How can I register several tickets to one account?",
    description: (
      <>
        If you have bought for example Two evening ticket and VIP upgrade, you
        can easily add both ticket codes to the same account. You can register
        your tickets in two ways: <br />
        <br />
        <ol className="list-decimal">
          <li>
            <b>Personal web address</b>
            <ol className="list-decimal">
              <li>
                Click the "login here" personal web address in one of your
                tickets. You will be taken to the platform.
              </li>
              <li>
                Add your email address and create a password. After that your
                first ticket is registered and linked to your account.{" "}
              </li>
              <li>
                You can add another ticket to the same account by opening the
                second ticket and clicking the personal web address there. You
                will be taken to the platform.
              </li>
            </ol>
          </li>
          <br />
          <li>
            <b>Ticket Code</b>

            <ol className="list-decimal">
              <li>
                You can also register your tickets by going straight to the web
                address <ELink url="www.burst.fi/nightwish" />
              </li>
              <li>
                Create an account by adding your email address and creating a
                password. After this you will be requested to register your
                ticket code.{" "}
              </li>
              <li>
                Copy your ticket code from your first ticket. (You can find your
                ticket code on your ticket next to the text "Your ticket code".
                The ticket code starts with numbers 00.){" "}
              </li>
              <li>
                After the first ticket is registered, you can register another
                ticket code by choosing "Register Your Ticket Here".
              </li>
            </ol>
          </li>
        </ol>
      </>
    ),
  },

  {
    title: "I don't have a ticket yet. Where can I buy a ticket?",
    description: (
      <>
        Buy your ticket from <ELink url="www.nightwish.com" /> or{" "}
        <ELink url="www.lippu.fi/nightwish" />
      </>
    ),
  },

  {
    title: "How long will the tickets be on sale?",
    description: (
      <>
        Tickets will be on sale: <br />
        <br />
        <b>
          Until May 28, 2021 at 10:30pm EEST (Finland) / 9:30pm CEST / 8:30pm
          BST*
        </b>
        Two evening ticket, One evening ticket FRI, VIP Europe**, VIP Europe
        upgrade**, VIP World**, VIP World upgrade** <br />
        <br />* North and South America: 3:30pm ET (UTC-4) / 12:30pm PT (UTC -7)
        / 4:30pm BRT (UTC-3) / 2:30pm CT (UTC -5) // Asia and Australia: Sat,
        May 29, 2021, 3:30am CST (UTC+8) / 4:30am JST (UTC+9) / 5:30am AEST
        (UTC+10) <br />
        <br />
        ** please notice that VIP virtual session will start: <br />
        <b>On Friday May 28, 2021:</b> Europe: 8pm EEST (Finland) (UTC+3) / 7pm
        CEST (UTC+2) / 6pm BST (UTC+1) // North and South America: 1pm ET
        (UTC-4) / 10am PT (UTC -7) / 2pm BRT (UTC-3) / 12 noon CT (UTC -5) //
        Asia and Australia: Sat, May 29, 2021, 1am CST (UTC+8) / 2am JST (UTC+9)
        / 3am AEST (UTC+10) <br />
        <br />
        <b>On Saturday May 29, 2021:</b>North and South America: 7pm ET (UTC-4)
        / 4pm PT (UTC -7) / 8pm BRT (UTC-3) / 6pm CT (UTC -5) // Europe: Sun,
        May 30, 2021: 2am EEST (Finland) (UTC+3) / 1am CEST (UTC+2) / 12
        midnight BST (UTC+1) // Asia and Australia: Sun, May 30, 2021, 7am CST
        (UTC+8) / 8am JST (UTC+9) / 9am AEST (UTC+10) <br />
        <b>VIP virtual session cannot be watched afterwards.</b> <br />
        <br />
        <b>Until May 29, 2021 at 9:30pm ET (UTC-4)*:</b>One evening ticket Sat{" "}
        <br />
        <br />
        *North and South America: 9:30pm ET (UTC-4) / 6:30pm PT (UTC -7) /
        10:30pm BRT (UTC-3) / 8:30pm CT (UTC -5) // Europe: Sun, May 30, 2021:
        4:30am EEST (Finland) (UTC+3) / 3:30am CEST (UTC+2) / 2:30am BST (UTC+1)
        // Asia and Australia: Sun, May 30, 2021, 9:30am CST (UTC+8) / 10:30am
        JST (UTC+9) / 11:30am AEST (UTC+10)
      </>
    ),
  },

  {
    title: "How can I upgrade my ticket to a VIP package?",
    description: (
      <>
        If you would like to upgrade your ticket to a VIP package, you can buy
        an add-on on <ELink url="www.nightwish.com" /> or{" "}
        <ELink url="www.lippu.fi/nightwish" />. You can choose either VIP Europe
        upgrade or VIP World upgrade. Find more about these ticket types on
        section "How to buy a ticket". If you buy an upgrade ticket, a concert
        ticket must be purchased separately. <br />
        <br /> VIP tickets will be on sale until May 28, 2021: <b>
          Europe:
        </b>{" "}
        10:30pm EEST (Finland) (UTC+3) / 9:30pm CEST (UTC+2) / 8:30pm BST
        (UTC+1) //
        <b>North and South America:</b> 3:30pm ET (UTC-4) / 12:30pm PT (UTC -7)
        / 4:30pm BRT (UTC-3) / 2:30pm CT (UTC -5) // <b>Asia and Australia:</b>{" "}
        Sat, May 29, 2021, 3:30am CST (UTC+8) / 4:30am JST (UTC+9) / 5:30am AEST
        (UTC+10)
      </>
    ),
  },

  {
    title: "What do I need to participate? ",
    description:
      "You can access the event with a computer or a mobile device. You will have the best user experience with the Google Chrome internet browser. An internet connection (10 Mbps or faster) is required. (If you can usually access and run streaming services or watch high quality videos on your device, it is very likely you will be able to access this event.) ",
  },

  {
    title: "Can I cast the event on my Smart Tv / Casting device?",
    description:
      "If you have a casting device you can stream the concert following the instructions from the manufacturer. This will operate as other websites, so please follow the standard procedures as you would do when casting your browser screen. ",
  },

  {
    title: "What internet browser is best to watch the events?",
    description:
      "In order to have the best user experience, we recommend you to use the most up to date version of Google Chrome. Other web browsers recommended are Edge 89, Firefox 86 and Safari 14. If the internet browser you are using doesn&apos;t work, please try another browser.",
  },

  {
    title:
      "Can I watch the events by using mobile phone or tablet instead of a computer?",
    description:
      "Yes you can. We suggest that you have the most up to date version of the web browser and operative system for your device to have an optimal user experience.",
  },

  {
    title: "Can I watch the concert later?",
    description:
      "Ticket holders will be able to access a recording of the stream for 48 hours after the concert. Please notice that it&apos;s not possible to watch the recording immediately after the concert. It is uploaded to the platform 4-6 hours after the show.",
  },

  {
    title: "Can I watch the VIP virtual session later?",
    description: (
      <>
        You cannot watch the VIP virtual session later. VIP virtual session will
        be shown before the shows: <br />
        <br />
        <b>On Friday the VIP virtual session will start:</b>
        <b>Europe:</b> 8pm EEST (Finland) (UTC+3) / 7pm CEST (UTC+2) / 6pm BST
        (UTC+1)
        <b>North and South America:</b> 1pm ET (UTC-4) / 10am PT (UTC -7) / 2pm
        BRT (UTC-3) / 12 noon CT (UTC -5) <b>Asia and Australia:</b> Sat, May
        29, 2021, 1am CST (UTC+8) / 2am JST (UTC+9) / 3am AEST (UTC+10) <br />
        <br />
        <b>On Saturday the VIP virtual session will start:</b>
        <b>North and South America:</b> 7pm ET (UTC-4) / 4pm PT (UTC -7) / 8pm
        BRT (UTC-3) / 6pm CT (UTC -5)
        <b>Europe:</b> Sun, May 30, 2021: 2am EEST (Finland) (UTC+3) / 1am CEST
        (UTC+2) / 12 midnight BST (UTC+1) <b>Asia and Australia:</b> Sun, May
        30, 2021, 7am CST (UTC+8) / 8am JST (UTC+9) / 9am AEST (UTC+10) VIP
        virtual session can be watched with the following ticket types: VIP
        Europe, VIP Europe upgrade, VIP World, VIP World upgrade.
      </>
    ),
  },

  {
    title: "Can I participate from anywhere in the world?",
    description:
      "Yes, you will be able to participate from anywhere in the world. Please notice that the organizer is not responsible, if it&apos;s not possible to watch the shows for the following reasons: government restricts the watching, your internet connection doesn't work or is not strong enough, your electricity is cut off, or any other reason beyond the organizer&apos;s control.",
  },

  {
    title: "I forgot my password",
    description:
      "If you forgot your password, you can reset and change it. You can access the password reset page from the login page.",
  },

  {
    title: "I cannot find my ticket anywhere",
    description: (
      <>
        You can find your ticket by logging on to our official ticket shop{" "}
        <ELink url="www.lippu.fi" />. You can find your purchased tickets under
        section "My orders". <br />
        <br /> Order confirmation and your ticket have also been sent to the
        email address you provided at the time of purchase. The sender is either
        tilausvahvistus@lippu.fi or noreply@lippu.fi. Try to search your email
        for messages from these senders. Please also check your spam folder.{" "}
        <br />
        <br /> If you cannot find your tickets from <ELink url="www.lippu.fi" />{" "}
        or from your email, please contact lippu.fi&apos;s customer service:
        tel. +358 10 633 1030 / (asiakaspalvelu@lippu.fi). The service is open
        on weekdays 9:00 AM - 1:00 PM CEST. lippu.fi provides customer service
        in English, Finnish and Swedish. On the event day you can contact the
        customer service here: www.burst.fi/nightwish/support <br />
        <br /> We recommend you to check well in advance that you can find your
        ticket from your email. Please note that the customer service will be
        congested during the event, so you may not receive an answer to your
        question immediately. We therefore recommend that you register your
        ticket several hours before the start of the event so that any ticket
        problems can be resolved on time and you can enjoy the concert without
        any problems.
      </>
    ),
  },

  {
    title: 'My ticket code or "Login here" link doesn\'t work. What can I do?',
    description: (
      <>
        Try to click "login here" link on your ticket again. <br />
        <br /> If the link won&apos;t open automatically, you can also manually
        copy and paste that link to the address bar of your browser (paint the
        whole link dark by using your mouse cursor. Then click the right button
        on your mouse and choose "copy". Then go to the address bar of your
        browser and click the right button and choose "paste". After this click
        the "Enter" button on your keyboard.) <br />
        <br />
        You can also type the "login here" link manually to the address bar of
        your internet browser by one letter at a time. <br />
        <br /> If the link still doesn&apos;t work, you can also copy the long
        ticket code that you can see on your ticket next to the text "Your
        ticket code". The ticket code starts with numbers 00. Copy or write
        manually the ticket code on section "Register Your ticket" on
        <Link href={ROUTES.PUBLIC_ROUTES.index}>
          <a className="underline">www.burst.fi/nightwish</a>
        </Link>
        . <br />
        <br /> The link / ticket code has to be perfectly correct, in order for
        it to work. So don&apos;t misspell any numbers or leave any numbers out.
        If the ticket link or ticket code doesn&apos;t work after several
        attempts, please contact the support:{" "}
        <Link href={ROUTES.PUBLIC_ROUTES.support}>
          <a className="underline">www.burst.fi/nightwish/support</a>
        </Link>
      </>
    ),
  },

  {
    title:
      'I registered my ticket code, but as I log in, the upcoming events says "Buy ticket"',
    description: (
      <>
        After you have registered all your tickets, you can see those events
        active on upcoming events list. If the status of some of the event reads
        "Buy ticket", it means that you don&apos;t have access to watch said
        event and if you want to watch it, you will have to buy another ticket.
        If you think you already have a ticket that should grant you the access
        to that event, please check that you have registered all your tickets.
        <br />
        <br />
        You can try to register your ticket code again. If you have bought
        several ticket types, please make sure that you have registered each
        one. Please also make sure that you are using the right email address
        and all your tickets were registered to the same email address/ account.
      </>
    ),
  },

  {
    title:
      "I shared a photo of my ticket / the information of my ticket code or personal link on the internet or on social media and now the system says that the ticket code is already used",
    description: (
      <>
        Unfortunately it looks like someone has copied your ticket code from the
        photo you have shared and is now using your ticket. In this case the
        ticket code is already used, and it can not be used again. You can buy a
        new ticket from <ELink url="www.nightwish.com" /> or{" "}
        <ELink url="www.lippu.fi/nightwish" />
      </>
    ),
  },

  {
    title:
      'Why are there so many events on Facebook called Nightwish "An Evening  with Nightwish in a Virtual World"?',
    description: (
      <>
        It has become more and more common on Facebook to have so-called fake
        events or fake event pages. These fake events are usually created by the
        trolls. The purpose is for example to trick participants to give their
        credit card information or other personal information. Don&apos;t join
        any suspicious Facebook events. This event&apos;s official Facebook
        event is:
        <ELink url="www.facebook.com/events/780388779565649" />
        <br />
        <br />
        Also, don&apos;t click any suspicious links that may be shared by
        so-called trolls in the comments on this official Facebook event page.
        Please be careful not to enter your ticket code, ticket link or payment
        details into any service other than the official ticket shop or platform
        mentioned in this guide.
      </>
    ),
  },

  {
    title: "What can I do if the sound or video is breaking?",
    description: (
      <>
        Check if there&apos;s someone else who is using the same internet
        connection to play a videogame, downloading big video files or other
        things that will heavily affect the internet connection. You can check
        the speed of your connection for example here:{" "}
        <ELink url="www.speedtest.net" />
        <br />
        <br />
        Check that the version of the web browser you are using is the latest.
        If it&apos;s not, you might need to update your browser. You can also
        try another browser.
        <br />
        <br />
        Check that there is no firewall in use. VPN might also cause some
        problems.
        <br />
        <br />
        If your internet connection is not working well, the video will be
        automatically streamed with lower quality.
        <br />
        <br />
        If you cannot hear any sound, check that your device&apos;s sound is on.
        Please also check that your web browser is not muted and also that a
        certain tab is not muted.
        <br />
        <br />
        If any of the tips above don&apos;t work, you can try to shut down and
        restart your device.
      </>
    ),
  },

  {
    title: "What do I do if my device disconnects or its battery dies? ",
    description: (
      <>
        If your device disconnects or its battery dies, you are able to log back
        in with the account you have created on the same device or a different
        one.
        <br />
        <br />
        Please note that you are able to be logged in on one device at a time.
        If you are signed in on multiple devices simultaneously, the platform
        will sign you off of your other devices automatically.
      </>
    ),
  },

  {
    title: "Where can I find real-time support for technical issues?",
    description: (
      <>
        On the event day you can reach the technical support at{" "}
        <ELink url="www.burst.fi/nightwish/support" />. Questions will be
        answered as soon as possible.
      </>
    ),
  },

  {
    title: "What kind of ticket types I can buy?",
    description: (
      <>
        <ol className="list-disc">
          <li>One evening ticket (Fri or Sat)</li>
          <li>starting from 35 € (+ order fee 1 €)</li>
          <li>includes right to watch Friday or Saturday show</li>
          <li>
            recording of the show can be watched for 48 hours after the show
          </li>
        </ol>
        <br />
        <b>Two evening ticket</b>
        <ol className="list-disc">
          <li>starting from 45 € (+ order fee 1 €)</li>
          <li>includes right to watch both shows</li>
          <li>recording can be watched for 48 hours after the show</li>
        </ol>
        <br />
        <b>VIP Europe</b>
        <ol className="list-disc">
          <li>starting from 109 € (+ order fee 1 €)</li>
          <li>
            incl. Two evening ticket, t-shirt, VIP pass, virtual session with
            the bass player of the Human. :II: Nature. Tour before the shows.
          </li>
          <li>incl. right to watch both shows</li>
          <li>recording can be watched for 48 hours after the show</li>
          <li>sizes S-XXL. Unisex.</li>
          <li>limited edition</li>
          <li>shipping to Europe only</li>
          <li>
            ticket buyers&apos; contact infos will be handed to the organizer
            (Fullsteam Agency and Till Dawn They Count) and to Backstage Rock
            Shop and Kapanen GmbH for the shipment of the t-shirts and VIP
            passes
          </li>
        </ol>
        <br />
        If you purchase VIP Europe or VIP Europe upgrade package later than on
        May 14, 2021, we won&apos;t be able to promise that the T-shirt and VIP
        pass will arrive to your home before the event.
        <br />
        <br />
        <b>VIP Europe upgrade</b>
        <ol className="list-disc">
          <li>starting from 79 € (+ order fee 1 €)</li>
          <li>
            incl. t-shirt, VIP pass, virtual session with the bass player of the
            Human. :II: Nature. Tour before the shows
          </li>
          <li>concert ticket must be purchased separately</li>
          <li>sizes S-XXL. Unisex.</li>
          <li>limited edition</li>
          <li>shipping to Europe only</li>
          <li>
            ticket buyers&apos; contact infos will be handed to the organizer
            (Fullsteam Agency and Till Dawn They Count) and to Backstage Rock
            Shop and Kapanen GmbH for the shipment of the t-shirts and VIP
            passes
          </li>
        </ol>
        <br />
        <br />
        If you purchase VIP Europe or VIP Europe upgrade package later than on
        May 14, 2021, we won&apos;t be able to promise that the T-shirt and VIP
        pass will arrive to your home before the event.
        <br />
        <br />
        <b>VIP World</b>
        <ol className="list-disc">
          <li>starting from 79 € (+ order fee 1 €)</li>
          <li>
            incl. Two evening ticket, virtual session with the bass player of
            the Human. :II: Nature. Tour before the shows.
          </li>
          <li>incl. right to watch both shows</li>
          <li>recording can be watched for 48 hours after the show</li>
          <li>for customers anywhere in the world</li>
        </ol>
        <br />
        <b>VIP World upgrade</b>
        <ol className="list-disc">
          <li>starting from 49 € (+ order fee 1 €)</li>
          <li>
            incl. virtual session with the bass player of the Human. :II:
            Nature. Tour before the shows
          </li>
          <li>concert ticket must be purchased separately</li>
          <li>for customers anywhere in the world</li>
        </ol>
      </>
    ),
  },

  {
    title: "Ticket upgrades",
    description: (
      <>
        If you have purchased a two evening ticket and would like to upgrade to
        a VIP package: Choose the addition option <b>VIP Europe</b> upgrade or{" "}
        <b>VIP World upgrade</b>. Customers in Europe can choose either one of
        the options. Limited quantity.
        <br />
        <br />
        If you have purchased a two evening ticket + t-shirt bundle and would
        like to upgrade to a VIP package:
        <br />
        <br />
        The t-shirt sold with the VIP package is different from the one in the
        prior ticket + t-shirt bundle (additional print on the back). It is not
        possible to cancel or exchange a previously purchased t-shirt for the
        shirt sold with the <b>VIP Europe package</b>. You can complement your
        order by choosing the addition option VIP Europe upgrade (in addition to
        a two evening ticket and a virtual session, you will receive 2 different
        shirts and a VIP pass) or <b>VIP World upgrade</b> (you will receive a
        two evening ticket and a virtual session, but not the VIP shirt or a VIP
        pass). Customers living in Europe can purchase either one of the
        options. Limited quantity.
        <br />
        <br />
        The t-shirts and VIP passes will be mailed during the spring.
      </>
    ),
  },

  {
    title: "So where should I buy my tickets from?",
    description: (
      <>
        Tickets are on sale on <ELink url="www.nightwish.com" /> and{" "}
        <ELink url="www.lippu.fi/nightwish" />. Kindly notice that buying your
        ticket from this event&apos;s official ticket shop is the only way you
        can make sure that your ticket is valid. If you are redirected from
        another website, please check that you make the purchase on lippu.fi
        online store, which is the official ticket shop of the event.
      </>
    ),
  },

  {
    title: "lippu.fi's delivery fees and payment method fees below",
    description: (
      <>
        Order fee (pdf ticket) of 1 € will be charged. Service fee is included
        in the ticket price.
        <br />
        <br />
        In addition to the delivery fee, a payment method fee may be charged for
        the ticket purchase depending on the payment method selected:
        <br />
        <br />
        1) Payment with an Amex credit card <br />
        - 1,5% of the order value
        <br />
        <br />
        2) Ticket invoice to consumers (payment in instalments) <br />
        – €5/order
        <br />
        <br />
        3) Ticket invoice to companies <br />- €25/order
      </>
    ),
  },

  {
    title: "How can I pay?",
    description: (
      <>
        <b>Payment cards: </b>
        <br />
        Visa, Visa Electron, Mastercard, Eurocard, American Express
        <br />
        <br />
        <b>PayPal</b>
        <br />
        You can pay for your purchases with Paypal payment. More information{" "}
        <ELink url="www.paypal.com" />
        <br />
        <br />
        <b>You can also pay your tickets with the following methods:</b>
        <br /> Finnair Plus points
      </>
    ),
  },

  {
    title: "Any further tips on the ticket buying process",
    description: (
      <>
        Buy your ticket only from this event&apos;s official ticket shops{" "}
        <ELink url="www.nightwish.com" /> and{" "}
        <ELink url="www.lippu.fi/nightwish" />, in order to make sure that your
        ticket is valid.
      </>
    ),
  },

  {
    title: "When will I receive my pdf-ticket?",
    description: (
      <>
        The pdf-ticket will be sent to your email right after the payment has
        been received. Please also check your email&apos;s spam folder.{" "}
      </>
    ),
  },

  {
    title: "Do not share pictures of your ticket",
    description: (
      <>
        It is essential that you do not share any image of your ticket or any
        information regarding your ticket anywhere to anyone. Doing so might
        result in your ticket code, ticket number or personal URL being copied
        and misused. If someone else logs into the event with your ticket data,
        it might prevent your access to the event. In such case, the event
        organizer is not liable or obliged to refund or replace your ticket.{" "}
      </>
    ),
  },

  {
    title: "Tickets as draw prizes",
    description: (
      <>
        The drawing of tickets is forbidden without the permission of the event
        organizer.
      </>
    ),
  },

  {
    title: "The concerts have been rescheduled from March to May",
    description: (
      <>
        The interactive "An Evening with Nightwish In a Virtual World" concert
        experiences that will kick off the "Human. :II: Nature." World Tour have
        been rescheduled from March until May due to changes in the band&apos;s
        touring schedule. The new dates are Friday, May 28 and Saturday, May 29,
        2021.
        <br />
        <br />
        Tickets purchased for the original dates are automatically valid for the
        new dates, or can be returned by March 12, 2021.
      </>
    ),
  },

  {
    title: "Tickets purchased for the original March dates",
    description: (
      <>
        Tickets purchased for the original March dates are automatically valid
        for the new May dates and do not need to be exchanged.
      </>
    ),
  },

  {
    title: "Returning products",
    description: (
      <>
        If you want to return a product you have purchased (T-shirt or VIP
        pass), you need to send the return notification within 14 days of
        receiving the item.
      </>
    ),
  },

  {
    title: "Return notification",
    description: (
      <>
        Write an email and tittle it as "Nightwish: return notification" and
        send it to the following recipients: sales@kapanen-production.de and
        asiakaspalvelu@lippu.fi
        <br />
        <br />
        Write the following information to your email:
        <br />
        <br />
        Name: <br />
        Phone number: <br />
        Email: <br />
        Order number: (you can find your order number from your pdf-ticket){" "}
        <br />
        Product you want to return:
      </>
    ),
  },

  {
    title: "Shipping the product",
    description: (
      <>
        Once you have sent the return notification email, please send the
        product to Kapanen-production. The product must be sent within 14 days
        of receiving it.
        <br />
        <br />
        Address: <br />
        Kapanen-production Almestr. 4-8 33649 Bielefeld GERMANY
        <br />
        <br />
        Add the following information inside of your return package: <br />
        Name: <br />
        Phone number: <br />
        Email: <br />
        Order number: (you can find your order number from your pdf-ticket)
        <br />
        <br />
        Once the returned product has arrived to Kapanen-production, Lippu.fi
        will start the refund process and they will return your money to your
        account.
        <br />
        <br />
        Please notice that the item must be unused and intact. The purchaser is
        responsible for the costs of returning the products. The refund right
        only applies to the physical products. Concert ticket and virtual
        session are non-refundable. Lippu.fi will refund the money only to the
        original purchaser.
      </>
    ),
  },

  {
    title: "Returning defective products",
    description: (
      <>
        If the product you received is defective, please contact{" "}
        <a className="underline" href="mailto:sales@kapanen-production.de">
          sales@kapanen-production.de
        </a>
        . Contact Kapanen-production within 14 days you received the product.
        Title your email as "Nightwish: defective product."
      </>
    ),
  },

  {
    title: "Changing the size of your t-shirt",
    description: (
      <>
        If you want to change the size of your T-shirt, please email to{" "}
        <a className="underline" href="mailto:sales@kapanen-production.de">
          sales@kapanen-production.de
        </a>{" "}
        within 14 days you received the T-shirt. Title your email as "Nightwish:
        changing the size of the T-shirt".
      </>
    ),
  },
];

export default FAQItems;
