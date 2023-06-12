import React from "react"
import { useRouter } from "next/router"
import { BuilderComponent, builder, useIsPreviewing, Builder, withChildren } from "@builder.io/react"
import DefaultErrorPage from "next/error"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import dynamic from "next/dynamic"
import { typographyClasses } from "../../components/Typography"

Builder.registerComponent(withChildren(dynamic(() => import("../../components/Menu").then((mod) => mod.Menu))), {
    name: "Menu",
    canHaveChildren: true,
    inputs: [
        { name: "inApp", type: "boolean" },
        { name: "logoLink", type: "string", required: true },
        {
            name: "items",
            type: "list",
            subFields: [
                {
                    name: "link",
                    type: "string",
                    required: true,
                },
                {
                    name: "title",
                    type: "string",
                    required: true,
                },
                {
                    name: "isActive",
                    type: "boolean",
                },
                {
                    name: "isImportant",
                    type: "boolean",
                },
            ],
        },
    ],
    image: "https://tabler-icons.io/static/tabler-icons/icons-png/3d-cube-sphere-off.png",
})

Builder.registerComponent(withChildren(dynamic(() => import("../../components/Landing").then((mod) => mod.Landing))), {
    name: "Landing",
    canHaveChildren: true,
    inputs: [
        { name: "title", type: "string" },
        { name: "subtitle", type: "string" },
        { name: "text", type: "string" },
        { name: "buttonText", type: "string" },
        { name: "buttonProps", type: "object", subFields: [{ name: "href", type: "string" }] },
        { name: "children", type: "string" },
        {
            name: "catchPoints",
            type: "list",
            subFields: [
                { name: "icon", type: "string", enum: ["Pay", "Time", "Worldwide", "LearnEarn"] },
                { name: "children", type: "string" },
            ],
            required: true,
        },
    ],
    image: "",
})

Builder.registerComponent(
    withChildren(dynamic(() => import("../../components/DownArrow").then((mod) => mod.DownArrow))),
    {
        name: "DownArrow",
        image: "",
    },
)

Builder.registerComponent(withChildren(dynamic(() => import("../../components/Footer").then((mod) => mod.Footer))), {
    name: "Footer",
    inputs: [
        {
            name: "links",
            type: "list",
            subFields: [
                {
                    name: "link",
                    type: "string",
                    required: true,
                },
                {
                    name: "title",
                    type: "string",
                    required: true,
                },
            ],
        },
    ],
    image: "",
})

Builder.registerComponent(withChildren(dynamic(() => import("../../components/icons/LearnEarn"))), {
    name: "Earn Money",
    inputs: [],
    image: "",
})

Builder.registerComponent(withChildren(dynamic(() => import("../../components/icons/PayConsultancy"))), {
    name: "Pay",
    inputs: [],
    image: "",
})

Builder.registerComponent(withChildren(dynamic(() => import("../../components/icons/Time"))), {
    name: "Time",
    inputs: [],
    image: "",
})

Builder.registerComponent(withChildren(dynamic(() => import("../../components/icons/Worldwide"))), {
    name: "Worldwide",
    inputs: [],
    image: "",
})

Builder.registerComponent(withChildren(dynamic(() => import("../../components/Button").then((mod) => mod.Button))), {
    name: "Button",
    inputs: [
        { name: "theme", type: "string", enum: ["main", "off", "naked"] },
        { name: "size", type: "string", enum: ["huge", "large", "medium", "normal", "none"] },
        { name: "disabled", type: "boolean" },
        { name: "children", type: "string" },
    ],
    image: "",
})

Builder.registerComponent(
    withChildren(dynamic(() => import("../../components/Typography").then((mod) => mod.Typography))),
    {
        name: "Typography",
        inputs: [
            { name: "component", type: "string", helperText: "HTML Element used in DOM" },
            { name: "children", type: "longText" },
            { name: "variant", type: "string", enum: Object.keys(typographyClasses) },
        ],
        image: "",
    },
)

Builder.registerComponent(withChildren(dynamic(() => import("../../components/AboutUs").then((mod) => mod.AboutUs))), {
    name: "AboutUs",
    inputs: [
        {
            name: "people",
            type: "list",
            subFields: [
                {
                    name: "name",
                    type: "string",
                },
                {
                    name: "email",
                    type: "string",
                },
                {
                    name: "position",
                    type: "string",
                },
            ],
        },
    ],
    image: "",
})

// Replace with your Public API Key
builder.init("ac51e69ef16e4f8fbc1a1df6a44edf61")

export const getStaticProps: GetStaticProps = async ({ params, resolvedUrl }: any) => {
    // Fetch the builder content
    const page = await builder
        .get("page", {
            userAttributes: {
                urlPath: "/" + (typeof params?.page === "string" ? params?.page : params?.page?.join("/") || ""),
            },
            url: resolvedUrl,
        })
        .toPromise()

    return {
        props: {
            page: page || null,
        },
        revalidate: 5,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Get a list of all pages in builder
    const pages = await builder.getAll("page", {
        // We only need the URL field
        fields: "data.url",
        options: { noTargeting: true },
    })

    return {
        paths: pages.map((page) => `${page.data?.url}`),
        fallback: true,
    }
}

const Home: NextPage = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()
    const isPreviewing = useIsPreviewing()

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    if (!page && !isPreviewing) {
        return <DefaultErrorPage statusCode={404} />
    }

    return (
        <>
            <Head>
                <title>{page?.data.title}</title>
            </Head>
            {/* Render the Builder page */}
            <BuilderComponent model='page' content={page} />
        </>
    )
}

export default Home
