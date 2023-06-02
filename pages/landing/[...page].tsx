import React from "react"
import { useRouter } from "next/router"
import { BuilderComponent, builder, useIsPreviewing, Builder, withChildren } from "@builder.io/react"
import DefaultErrorPage from "next/error"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import dynamic from "next/dynamic"

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
    inputs: [{ name: "title", type: "string" }],
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
