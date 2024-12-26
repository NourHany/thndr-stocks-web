import Logo from "../../../assets/nasdaq-logo.png";

type HeaderProps = {
  onSearch: (search: string) => void;
};

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <div className="flex md:justify-between items-center p-4 bg-gray-100 rounded-br-xl rounded-bl-xl">
      <div className="w-full">
        <img width={100} height={100} src={Logo} alt="Nasdaq Logo" />
      </div>

      <input
        type="text"
        placeholder="Search Ticker"
        className="p-2 rounded text-black w-[700px]"
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="w-full hidden md:flex"></div>
    </div>
  );
};

export default Header;
