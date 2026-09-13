"use client";
import { useAuth, User } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
} from "lucide-react";

import { toast } from "sonner";

import "@/css/Auth.css";

export type LoginRes = {
    name: string;
    email: string;
    role: string;
    id: string;
};

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const { setUser } = useAuth();

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Login failed: ${response.status}`
                );
            }

            const result: User = await response.json();

            setUser(result);

            toast.success("Login successful!", {
                description: `Welcome back, ${result.name}!`,
            });

            const redirectUrl = searchParams.get("redirect");

            if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error("Login error:", error);

            toast.error("Failed to Login!", {
                description:
                    "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <main className="authPage">
            <div
                className="authStars"
                aria-hidden="true"
            >
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>

            <div className="authCard">
                <Link
                    href="/"
                    className="authBack"
                >
                    <ArrowLeft size={17} />
                    <span>Back to home</span>
                </Link>

                <div className="authBrand">
                    <div className="authBrandMark">
                        <span>&lt;/&gt;</span>
                    </div>

                    <h1>
                        GSoC <span>Hub</span>
                    </h1>

                    <p>
                        Open source today,
                        <br />
                        a brighter tomorrow.
                    </p>
                </div>

                <div className="authHeading">
                    <h2>Welcome back</h2>

                    <p>
                        Sign in to continue exploring GSoC
                        opportunities.
                    </p>
                </div>

                <form
                    className="authForm"
                    onSubmit={handleSubmit}
                >
                    <div className="authField">
                        <div className="authFieldIcon">
                            <Mail size={19} />
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="authField">
                        <div className="authFieldIcon">
                            <LockKeyhole size={19} />
                        </div>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="button"
                            className="authPasswordButton"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    <div className="authOptions">
                        <label className="authRemember">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) =>
                                    setRememberMe(
                                        event.target.checked
                                    )
                                }
                            />

                            <span>Remember me</span>
                        </label>

                        <Link href="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="authPrimaryButton"
                    >
                        Sign in
                    </button>
                </form>

                <div className="authDivider">
                    <span />
                    <b>OR</b>
                    <span />
                </div>

                <button
                    type="button"
                    className="authGoogleButton"
                    onClick={() => {
                        const redirectUrl =
                            searchParams.get("redirect");

                        const googleUrl =
                            redirectUrl
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google?redirect=${encodeURIComponent(
                                    redirectUrl
                                )}`
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`;

                        window.location.assign(
                            googleUrl
                        );
                    }}
                >
                    <span className="googleLogo">
                        G
                    </span>

                    <span>
                        Continue with Google
                    </span>
                </button>

                <p className="authSwitch">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup">
                        Sign up
                    </Link>
                </p>

                <div className="authHorizon">
                    <div className="authMountain authMountainOne" />
                    <div className="authMountain authMountainTwo" />
                    <div className="authHorizonLine" />
                </div>

                <div className="authFooter">
                    Students
                    <span>•</span>
                    Mentors
                    <span>•</span>
                    Open Source
                </div>
            </div>
        </main>
    );
}