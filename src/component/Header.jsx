

const Header = () => {
    const reload = (e) => {
        e.preventDefault();
        location.reload();
    }
  return (
    <div className="header">
       
        <p><a href="#" onClick={reload}>TreeMap</a></p>
    </div>
  )
}

export default Header