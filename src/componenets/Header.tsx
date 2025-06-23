
export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">📇 Contact Manager</h1>
        <div className="text-sm sm:text-base opacity-90">
          Made by <a href="https://www.capsitech.com/" target="blank">@capsitech</a>
        </div>
      </div>
    </header>
  );
}
