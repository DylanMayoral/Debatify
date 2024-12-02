# Reset the database
Comment.destroy_all
Topic.destroy_all
User.destroy_all
puts "-" * 25
puts "Resetting database..."
puts "-" * 25

# Create users
require 'open-uri'
require 'faker'

image_urls = [
  "https://cdn.pfps.gg/pfps/5635-goofy.png",
  "https://i.pinimg.com/736x/86/d3/e2/86d3e24b8647e52cc6c815a52ff6e445.jpg",
  "https://tr.rbxcdn.com/180DAY-d5f59643c2050b82be112fe297d4ea19/420/420/Hat/Webp/noFilter",
  "https://pikshunt.com/wp-content/uploads/2024/05/100000003914_Goofy_Ahh_Pictures.jpg.webp",
  "https://static.planetminecraft.com/files/image/minecraft/texture-pack/2023/088/16414626-pack_m.jpg",
  "https://p16-va.lemon8cdn.com/tos-maliva-v-ac5634-us/oQtOJFDHt1Be1QAHWFEIGOCDpAGQwsAgImfoQB~tplv-tej9nj120t-origin.webp",
  "https://cutegirlpic.in/wp-content/uploads/2024/06/img-4-3.webp",
  "https://i.pinimg.com/originals/ec/e5/37/ece537399b0e7cb065d1364a5617edd9.jpg",
  "https://i.pinimg.com/736x/f1/ea/c3/f1eac39f7e801ec627349af2ceab4e7c.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYvJWwRKSEHODxrPLDbe_BO8Fry_S0Kxr6Bg&s",
  "https://wallpapers-clan.com/wp-content/uploads/2022/02/fortnite-pfp-5.jpg",
  "https://i.pinimg.com/736x/3f/06/5b/3f065bc60f49aefe50244069a71302f0.jpg",
  "https://preview.redd.it/goofy-blue-pfp-v0-3e9elnursklb1.png?auto=webp&s=a01be1c9b7e706db23709c090c8a8089f5446934",
  "https://us-tuna-sounds-images.voicemod.net/b8e29bee-bd5d-4574-be79-171c2f82f3fe-1664477220626.jpg",
  "https://preview.redd.it/the-best-wallpaper-ever-v0-azooeafy2uaa1.jpeg?width=623&format=pjpg&auto=webp&s=47e739cae2e91cd199db03683c2a34fba5f6a27f",
  "https://photosly.net/wp-content/uploads/2024/02/goofy-ahh-memes-photos-images-pfp1.jpg",
  "https://pbs.twimg.com/media/FmTlu40WQAAQbf0.jpg",
  "https://i.pinimg.com/736x/c3/9a/c5/c39ac5ebf279969584e8e12b7622c556.jpg",
  "https://i.pinimg.com/236x/df/a9/36/dfa936c58b78dc35318a3fc684e38358.jpg",
  "https://cdn3.emoji.gg/emojis/5263-goffycatmeme.png",
  "https://i.redd.it/ijt6xs0wz4ea1.jpg",
  "https://us-tuna-sounds-images.voicemod.net/067a2006-5ad8-40c3-9f94-e6e82c582f7d-1661219753344.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnaE0CplSnQWaLtNGJPlbCAn74ci-1wCnkAA&s",
  "https://media.tenor.com/E70TMSI7rsUAAAAe/memes-goofy-ahh-pictures-meme.png",
  "https://static.wikia.nocookie.net/beluga/images/9/98/Quandale_D.webp/revision/latest/thumbnail/width/360/height/360?cb=20221012110207",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcAJN2cpzClyBZxTX_Og70DqiDznvrCuWFg&s",
  "https://i.pinimg.com/236x/f9/f5/07/f9f50757afb22d4d3df5ee9bde0c91ac.jpg",
  "https://i.pinimg.com/736x/30/b2/94/30b294d1c07117369ca79b55481486ca.jpg",
  "https://i.pinimg.com/474x/46/5f/a7/465fa792bac7b94c1d229d43edeaa20d.jpg"
]

famous_users = image_urls.shuffle.each_with_index.map do |image_url, index|
  { name: Faker::Name.name, image_url: image_url }
end

famous_users.each_with_index do |user_data, index|
  image_url = URI.open(user_data[:image_url])
  photo_blob = ActiveStorage::Blob.create_and_upload!(
    io: image_url,
    filename: "#{user_data[:name].parameterize}.jpg",
    content_type: 'image/jpeg'
  )

  User.create!(
    name: user_data[:name],
    email: "user#{index + 1}@example.com",
    password: "password123",
    password_confirmation: "password123",
    photo: photo_blob
  )
end

puts "Users created: #{User.count}"

# Define topics
topics = [
  { title: "The rise of virtual reality in gaming", description: "Exploring how virtual reality is changing the gaming experience.", category: "Tech" },
  { title: "The impact of sports on mental health", description: "Examining how participation in sports can improve mental well-being.", category: "Sports" },
  { title: "The future of space exploration", description: "Exploring the next steps in humanity's journey into space.", category: "Tech" },
  { title: "The benefits of meditation", description: "Discussing how meditation can improve mental health and focus.", category: "Health" },
  { title: "The role of technology in education", description: "How technology is transforming the learning experience.", category: "Education" },
  { title: "Climate change and its impact", description: "Understanding the effects of climate change on our planet.", category: "Environment" },
  { title: "The evolution of social media", description: "How social media has changed the way we communicate.", category: "Society" },
  { title: "The importance of mental health awareness", description: "Raising awareness about mental health issues and their impact.", category: "Health" },
  { title: "The impact of climate change on wildlife", description: "Examining how climate change affects biodiversity and ecosystems.", category: "Environment" },
  { title: "The role of art in society", description: "Exploring how art influences culture and community engagement.", category: "Society" },
  { title: "The influence of technology on relationships", description: "Discussing how technology shapes personal connections.", category: "Tech" },
  { title: "The future of renewable energy", description: "Investigating advancements in renewable energy sources and their potential.", category: "Environment" },
  { title: "The significance of cultural diversity", description: "Understanding the value of cultural diversity in society.", category: "Society" }
]

# Create topics
topics.each do |topic_data|
  Topic.create!(
    title: topic_data[:title],
    description: topic_data[:description],
    category: topic_data[:category],
    user_id: User.all.sample.id
  )
end

puts "Topics created: #{Topic.count}"

# Add realistic comments and replies specific to topics
Topic.all.each do |topic|
  users = User.all.shuffle

  sides = case topic.title
          when "The rise of virtual reality in gaming"
            {
              "for" => [
                ["Virtual reality makes gaming so immersive. I felt like I was in another world playing VR Skyrim!", "Exactly! It feels like the future of entertainment."],
                ["It’s great for connecting with friends in virtual spaces. VR chat is so much fun!", "Totally agree. It’s like having a hangout spot without leaving home."],
                ["VR can enhance learning experiences in educational games.", "Absolutely! It opens up new ways to engage with content."]
              ],
              "neutral" => [
                ["The technology is impressive, but it’s still so expensive.", "True, but prices are slowly coming down over time."],
                ["Some people might prefer traditional gaming over VR.", "That’s understandable; everyone has their preferences."]
              ],
              "against" => [
                ["VR can cause motion sickness for many people.", "Yeah, I tried it once, and I couldn’t last more than 10 minutes."],
                ["It’s isolating. Spending hours in VR might disconnect people from real life.", "Absolutely. Social interaction in VR isn’t the same as face-to-face."],
                ["The technology can be overwhelming for new users.", "I agree, it takes time to get used to the controls."],
                ["Some users may feel disoriented after using VR for extended periods.", "That's a common issue; it can take time to adjust back to reality."]
              ]
            }
          when "The impact of sports on mental health"
            {
              "for" => [
                ["Playing sports helps me relieve stress and stay focused.", "Absolutely! Exercise is amazing for mental clarity."],
                ["Team sports are great for building relationships and boosting confidence.", "Couldn’t agree more. The camaraderie is unmatched."],
                ["Sports can provide a sense of achievement and purpose.", "Exactly! Setting and reaching goals is fulfilling."]
              ],
              "neutral" => [
                ["Not everyone enjoys sports, though. Some might find it stressful.", "That’s fair. It depends on personality and interests."],
                ["Sports are great, but injuries can really take a mental toll.", "Very true. Recovery is tough physically and mentally."],
                ["Some people might feel pressured to perform.", "That’s a valid concern; it can lead to anxiety."],
                ["Participating in sports can sometimes lead to burnout if not managed well.", "Absolutely, balance is key to enjoying sports."],
                ["Some individuals may feel excluded if they don't fit the typical athlete mold.", "That’s a valid point; inclusivity in sports is important."]
              ],
              "against" => [
                ["Competitive sports can sometimes create too much pressure.", "Exactly. That pressure can lead to anxiety or burnout."]
              ]
            }
          when "The future of space exploration"
            {
              "for" => [
                ["Space exploration is key to humanity’s survival in the long term.", "Absolutely. Colonizing other planets is essential."],
                ["It inspires the next generation to pursue science and innovation.", "Yes! Programs like NASA motivate young minds everywhere."]
              ],
              "neutral" => [
                ["It’s exciting, but we need to balance funding with problems on Earth.", "True, but solving space challenges often benefits Earth too."],
                ["Space travel is still so risky. Look at the number of failed missions.", "That’s a fair concern, but technology keeps improving."],
                ["Some people might not see the value in space exploration.", "That’s understandable; it’s a matter of perspective."],
                ["The focus on space can divert attention from pressing Earth issues.", "That’s a valid concern; we need to find a balance."]
              ],
              "against" => [
                ["Why invest billions in space when people on Earth are starving?", "Exactly. Those resources could help so many right now."],
                ["Space debris is becoming a huge issue. More exploration could make it worse.", "Good point. Cleaning up space should be a priority too."]
              ]
            }
          when "The benefits of meditation"
            {
              "for" => [
                ["Meditation has helped me reduce anxiety and improve focus.", "Absolutely! It's a game changer for mental clarity."]
              ],
              "neutral" => [
                ["Not everyone finds meditation effective; it can be challenging.", "That’s true; it requires practice and patience."]
              ],
              "against" => [
                ["Meditation might not work for everyone; some may find it frustrating.", "Exactly, it can be difficult to quiet the mind."],
                ["It can be seen as a trend rather than a genuine practice.", "That’s a fair concern; authenticity matters."]
              ]
            }
          when "The role of technology in education"
            {
              "for" => [
                ["Technology makes learning more accessible and engaging.", "Absolutely! Online resources are invaluable."],
                ["It allows for personalized learning experiences.", "Yes! Tailoring education to individual needs is crucial."],
                ["Technology can connect students with global perspectives.", "Exactly! It broadens horizons and fosters collaboration."],
                ["It can provide interactive and immersive learning experiences.", "Absolutely, it makes learning more engaging."]
              ],
              "neutral" => [
                ["Not all students have equal access to technology.", "That’s true; the digital divide is a significant issue."]
              ],
              "against" => [
              ]
            }
          when "Climate change and its impact"
            {
              "for" => [
                ["Addressing climate change is crucial for future generations.", "Absolutely! We owe it to them to take action."],
                ["Renewable energy sources can significantly reduce our carbon footprint.", "Yes! Transitioning to renewables is essential."],
              ],
              "neutral" => [
                ["Some people may not believe in climate change despite the evidence.", "That’s true; misinformation is a challenge."],
                ["The effects of climate change can be hard to see immediately.", "Absolutely, it often requires long-term observation."],
                ["Balancing economic growth with environmental protection is complex.", "That’s a valid concern; it requires careful planning."],
                ["Not everyone agrees on the best solutions to combat climate change.", "Absolutely, it’s a complex issue with many perspectives."],
                ["The focus on climate change can overshadow other important issues.", "That’s a valid concern; we need to find a balance."]
              ],
              "against" => [
                ["Some argue that climate change is exaggerated for political gain.", "That’s a fair point; skepticism exists."],
                ["The costs of implementing green technologies can be high.", "Exactly, funding is a significant barrier."],
                ["Not everyone agrees on the best solutions to combat climate change.", "Absolutely, it’s a complex issue with many perspectives."]
              ]
            }
          when "The evolution of social media"
            {
              "for" => [
                ["Social media has revolutionized communication and connection.", "Absolutely! It brings people together."],
                ["It provides a platform for marginalized voices.", "Yes! It amplifies voices that need to be heard."],
                ["Social media can foster community and support networks.", "Exactly! It helps people find their tribe."],
                ["It can provide a platform for activism and social change.", "Absolutely, it has the power to mobilize people."]
              ],
              "neutral" => [
                ["Not everyone enjoys using social media; some prefer face-to-face interactions.", "That’s true; personal preferences vary."],
                ["Social media can sometimes lead to misinformation.", "Absolutely, critical thinking is essential."],
                ["The impact of social media on mental health is still being studied.", "That’s a valid point; research is ongoing."]
              ],
              "against" => [
                ["Social media can contribute to feelings of isolation and anxiety.", "Exactly! It can be a double-edged sword."],
                ["It often promotes unrealistic standards and comparisons.", "That’s a fair concern; it can affect self-esteem."]
              ]
            }
          when "The importance of mental health awareness"
            {
              "for" => [
                ["Raising awareness about mental health can reduce stigma.", "Absolutely! Open conversations are essential."],
                ["Education on mental health can help people recognize symptoms.", "Yes! Early intervention is crucial."],
                ["Support systems can be strengthened through awareness.", "Exactly! Community support is vital."],
                ["It can lead to early intervention and better outcomes.", "Absolutely, awareness can save lives."],
                ["Mental health awareness can lead to more compassionate communities.", "Exactly! It fosters empathy and understanding."]
              ],
              "neutral" => [
                ["Some people may not understand mental health issues.", "That’s true; education is key."],
                ["Mental health awareness campaigns can sometimes be misunderstood.", "Absolutely, clarity in messaging is important."],
                ["Not everyone feels comfortable discussing mental health.", "That’s a valid point; it can be a sensitive topic."]
              ],
              "against" => [
                ["Some argue that mental health awareness can lead to over-diagnosis.", "That’s a fair concern; balance is needed."]
              ]
            }
          when "The impact of climate change on wildlife"
            {
              "for" => [
                ["Climate change poses a significant threat to biodiversity.", "Absolutely! Many species are at risk."],
                ["Conservation efforts are crucial to protect endangered species.", "Yes! We must act to preserve our planet's wildlife."],
                ["Raising awareness can lead to more support for conservation.", "Exactly! Education is key to driving change."],
                ["Conservation efforts can lead to healthier ecosystems.", "Absolutely, it supports the balance of nature."]
              ],
              "neutral" => [
                ["Some people may not see the immediate effects of climate change on wildlife.", "That’s true; it often requires long-term observation."],
              ],
              "against" => [
                ["Some argue that climate change is exaggerated for political gain.", "That’s a fair point; skepticism exists."],
                ["The costs of implementing conservation measures can be high.", "Exactly, funding is a significant barrier."],
                ["Not everyone agrees on the best solutions to protect wildlife.", "Absolutely, it’s a complex issue with many perspectives."],
                ["The focus on climate change can overshadow other important issues.", "That’s a valid concern; we need to find a balance."]
              ]
            }
          when "The role of art in society"
            {
              "for" => [
                ["Art can inspire social change and raise awareness.", "Absolutely! It has the power to move people."],
                ["Creative expression is essential for mental well-being.", "Yes! It allows individuals to process emotions."],
                ["Art fosters community and connection among people.", "Exactly! It brings people together."],
                ["It can provide a platform for activism and social change.", "Absolutely, it has the power to mobilize people."],
                ["Art can promote empathy and understanding among diverse groups.", "Exactly! It bridges gaps and fosters unity."]
              ],
              "neutral" => [
                ["Not everyone appreciates art in the same way.", "That’s true; personal preferences vary."],
                ["The value of art can be subjective.", "Absolutely, it often depends on individual interpretation."],
                ["Art can sometimes be seen as elitist.", "That’s a valid concern; accessibility is important."],
                ["The focus on art can overshadow other important issues.", "That’s a valid concern; we need to find a balance."]
              ],
              "against" => [
                ["Some argue that art funding should be redirected to essential services.", "That’s a fair point; priorities matter."],
                ["Art can be seen as a luxury rather than a necessity.", "Exactly, basic needs should come first."],
                ["Not all art is universally appreciated.", "Absolutely, taste is subjective."],
                ["The focus on art can overshadow other important issues.", "That’s a valid concern; we need to find a balance."],
                ["Not everyone agrees on the best ways to promote art.", "Absolutely, it’s a complex issue with many perspectives."]
              ]
            }
          when "The influence of technology on relationships"
            {
              "for" => [
                ["Technology can help maintain long-distance relationships.", "Absolutely! It bridges the gap."],
                ["Social media allows us to connect with friends and family easily.", "Yes! It keeps us in touch."]
              ],
              "neutral" => [
                ["Some people may feel overwhelmed by constant connectivity.", "That’s true; balance is key."]
              ],
              "against" => [
                ["Over-reliance on technology can weaken face-to-face interactions.", "Exactly! Personal connection is vital."],
                ["Social media can contribute to feelings of isolation.", "That’s a fair concern; moderation is key."]
              ]
            }
          when "The future of renewable energy"
            {
              "for" => [
                ["Investing in renewable energy is crucial for sustainability.", "Absolutely! It’s essential for our planet's future."],
                ["Renewable energy can reduce our dependence on fossil fuels.", "Yes! Transitioning is vital."]
              ],
              "neutral" => [
                ["Some people may be skeptical about the feasibility of renewable energy.", "That’s true; it requires significant investment."],
                ["The transition to renewable energy can be slow.", "Absolutely, it takes time to implement changes."],
                ["Not all regions have equal access to renewable energy resources.", "That’s a valid concern; infrastructure is key."]
              ],
              "against" => [
                ["Some argue that renewable energy sources can be unreliable.", "That’s a fair point; consistency is important."],
                ["The costs of implementing renewable energy can be high.", "Exactly, funding is a significant barrier."],
                ["Not everyone agrees on the best solutions for renewable energy.", "Absolutely, it’s a complex issue with many perspectives."]
              ]
            }
          when "The significance of cultural diversity"
            {
              "for" => [
                ["Cultural diversity enriches our communities.", "Absolutely! It brings different perspectives."],
                ["Embracing diversity can lead to innovation and creativity.", "Yes! It fosters new ideas."],
                ["Cultural exchange promotes understanding and tolerance.", "Exactly! It helps bridge gaps between people."]
              ],
              "neutral" => [
                ["Some people may not appreciate cultural diversity.", "That’s true; education is key."]
              ],
              "against" => [
                ["Some argue that cultural diversity can lead to division.", "That’s a fair point; balance is needed."],
                ["The focus on diversity can overshadow other important issues.", "Exactly, all aspects of society matter."],
                ["Not everyone agrees on the best ways to promote cultural diversity.", "Absolutely, it’s a complex issue with many perspectives."]
              ]
            }
          end

  sides.each do |status, comments_with_replies|
    comments_with_replies.each do |comment, reply|
      # Create the top-level comment
      parent_user = users.pop
      if parent_user
        parent_comment = Comment.create!(
          content: comment,
          status: status,
          user: parent_user,
          topic: topic
        )

        # Create the reply
        reply_user = users.pop
        if reply_user
          Comment.create!(
            content: reply,
            status: status,
            user: reply_user,
            topic: topic,
            parent_id: parent_comment.id
          )
        else
          puts "Warning: No available user for reply to comment: '#{comment}'"
        end
      else
        puts "Warning: No available user for comment: '#{comment}'"
      end
    end
  end
end

puts "Comments and replies created successfully!"
puts "Seeding complete!"
