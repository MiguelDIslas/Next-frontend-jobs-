import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-2 bg-dark text-white m-0">
      <p className="text-center m-0 py-2">
        <span className="mr-4">Jobbe - 2021-2022. All rights Reserved</span>
        <Link
          rel="noreferrer"
          target="_blank"
          href="https://storyset.com/people"
        >
          People Illustration by Storyset
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
