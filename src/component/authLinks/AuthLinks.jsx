"use client";
import { useContext, useEffect, useState } from "react";

import styles from "./auth.module.css";
import Link from "next/link";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import { signOut, useSession } from "next-auth/react";

import { MdArrowDropDown } from "react-icons/md";
import userImage from "../../../public/user.png";
export default function AuthLinks() {
  const [open, setopen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { status } = useSession();
  const { data } = useSession();

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [open]);

  return (
    <>
      <div >


        {data && (
          <div className={styles.userProfile}>
            <Link className={styles.user} href="/">
              <Image
                alt="img"
                style={{ borderRadius: "50%" }}
                width={30}
                height={30}
                src={data.user.image || `/user.png`}
              />
              <MdArrowDropDown />
            </Link>
            <div className={styles.dropdown}>
              <div className={styles.dropdownContent}>
                <div className={styles.userName}>{data.user.name}</div>
                <div className={styles.userEmail}>{data.user.email}</div>
              </div>
            </div>
          </div>
        )}
        <div  className={styles.menuBar}>
          {theme === "dark" ? (
            <Image
              onClick={() => {
                setopen(!open);
              }}
              className={styles.burger}
              width={35}
              height={35}
              src="/menu-bar.png"
              alt="img"
            />
          ) : (
            <Image
              alt="img"
              onClick={() => {
                setopen(!open);
              }}
              className={styles.burger}
              width={35}
              height={35}
              src="/menu.png"
            />
          )}
        </div>


        {open && (
          <div className={styles.responsivMenu}>
            <div className={styles.profile}>
              <Image
                alt="img"
                style={{ borderRadius: "50%" }}
                width={50}
                height={50}
                src={data?.user.image || `/user.png`}
              />
              <h2 className={styles.userName_res}>{data?.user?.name}</h2>
              <p className={styles.email_res}>{data?.user?.email}</p>
            </div>
            <hr />
            <div className={styles.links}>
              <Link className={styles.link1} href="/">
                Home
              </Link>
              <Link className={styles.link1} href="/">
                About
              </Link>
              <Link className={styles.link1} href="/">
                Contact us
              </Link>
            </div>
          </div>
        )}

      </div>

      <div className={styles.res_container}>
        <div>
          {status == "authenticated" ? (
            <div className={styles.res_menu}>
              <Link href="/write" className={styles.write}>
                Write
              </Link>
              <Link
                onClick={() => {
                  signOut("google");
                }}
                className={styles.loginBtn}
                href="/login"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link className={styles.loginBtn} href="/login">
              Login
            </Link>
          )}
        </div>
        <div>
          {theme === "dark" ? (
            <Image
              onClick={() => {
                setopen(!open);
              }}
              className={styles.burger}
              width={35}
              height={35}
              src="/menu-bar.png"
              alt="img"
            />
          ) : (
            <Image
              alt="img"
              onClick={() => {
                setopen(!open);
              }}
              className={styles.burger}
              width={35}
              height={35}
              src="/menu.png"
            />
          )}
        </div>

      </div>
    </>
  );
}
