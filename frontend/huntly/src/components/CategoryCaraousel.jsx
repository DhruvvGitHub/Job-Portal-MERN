import { Button } from "./ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel"

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "UI/UX Designer",
  "Mobile App Developer"
];

const CategoryCaraousel = () => {
  return (
    <div>
       <Carousel opts={{loop: true}} className="w-full max-w-2xl mx-auto my-20">
        <CarouselContent>
          {
            categories.map((cat, index) => {
              return <CarouselItem className="w-fit md:basis-1/2 lg:basis-1/3" key={index}>
                <Button variant="outline">
                  {cat}
                </Button>
              </CarouselItem>
            })
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel> 
    </div>
  )
}

export default CategoryCaraousel