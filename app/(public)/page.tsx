import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface featureProps {
    title: string,
    description: string,
    icon: string
}

const features: featureProps[] = [
    {
        title: "Comprehensive Courses",
        description: "Access a wide range of carefully currated courses designed by industry experts.",
        icon: '📚'
    },
    {
        title: "Interactive Learning",
        description: "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
        icon: '🎮'
    },
    {
        title: "Progress Tracking",
        description: "Monitor your progress and achievements with detailed analytics and personalized dashboards,",
        icon: '📊'
    },
    {
        title: "Community Support",
        description: "Join a vibrant community of learners and instructors to collaborate and share knowledge.",
        icon: '👥'
    },
]

export default function Home() {
    return (
        <>
            <section className="relative py-20">
                <div className="flex flex-col items-center text-center space-y-8">
                    <Badge
                        variant="outline"
                        className="px-4 py-2 mb-8 text-sm backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        <span className="text-muted-foreground">
                           The future of Online Christian Education
                        </span>
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Elevate your Learning Experience
                    </h1>
                    <p className="max-w-175 text-muted-foreground md:text-xl">
                        Diacover a new way to learn with our modern,interactive
                        learning management system. Access high-quality courses anytime, anywhere.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link href={'/courses'}
                            className={buttonVariants({
                                size: 'lg',
                            })}>
                            Explore Courses
                        </Link>

                        <Link href={'/login'}
                            className={buttonVariants({
                                size: 'lg',
                                variant: 'outline'
                            })}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                {features.map((feature, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-muted transition-all">
                        <CardHeader>
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}

            </section>
        </>
    );
}
