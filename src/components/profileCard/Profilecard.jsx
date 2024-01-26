import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cover from "../../img/covernew.jpg";
import Profile from "../../img/profileImgnew.png";
import "./Profilecard.css";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/userAction";

const Profilecard = ({ location, person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const serverPublic="http://localhost:5000/images/"
  const dispatch = useDispatch();
  // console.log(user,"card")
  const setUser = () => {
    dispatch(getUser(user._id));
  };

  return (
    <div className="Profilecard">
      <div className="Profileimages">

        
        {/* <img
          src={
            person?.coverPicture
              ? serverPublic + person.coverPicture
              : !person
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpeg"
          }
          alt=""
        />
        <img
          src={
            person?.profilePicture
              ? serverPublic + person.profilePicture
              : !person
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.jpeg"
          }
          alt=""
        /> */}

<img src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpeg"
          } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.jpeg"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="Profilename">
        <span>
          {person?.firstname
            ? person.firstname
            : !person
            ? user.firstname
            : "firstname"}{" "}
          {person?.lastname ? person.lastname : !person ? user.lastname : ""}
        </span>
        <span>
          {person?.worksAt
            ? person.worksAt
            : !person
            ? user.worksAt
            : "Tell about yourself"}
        </span>

        {/* <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt?user.worksAt:"Tell about urself"}</span> */}
      </div>
      <div className="Followstatus">
        <hr />
        <div>
          <div className="Follow">
            <span>
              {person?.following
                ? person.following.length
                : user.following.length}
            </span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="Follow">
            <span>
              {person?.followers
                ? person.followers.length
                : user.followers.length}
            </span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="Follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
            onClick={setUser}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default Profilecard;
