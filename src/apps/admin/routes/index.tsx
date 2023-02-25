import { server } from '@/apps/server/server'

export default function Index() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <h1>{server()}</h1>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/tutorials/blog"
                        rel="noreferrer"
                    >
                        15m Quickstart Blog Tutorial
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/tutorials/jokes"
                        rel="noreferrer"
                    >
                        Deep Dive Jokes App Tutorial
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/docs"
                        rel="noreferrer"
                    >
                        Remix Docs
                    </a>
                </li>
            </ul>
            <p>
                <img src="/barbara-palvin.jpg" alt="Palvin Barbi" />
            </p>
        </div>
    )
}