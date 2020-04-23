const Header = () => {
  // NOTE: IRL this could be a React.useContext(MyProfile).
  const user = { name: 'Julie Howard', role: 'Admin', picUrl: null }

  return (
    <header>
      <div>
        <Avatar src={user.picUrl} />
        <div>
          <div>{user.name}</div>
          <div>{user.role}</div>
        </div>
      </div>
    </header>
  )
}

// IRL this would be its own file but for now, it's okay here.

const Avatar = src => {
  return <span>[]</span>
}

export default React.memo(Header)
