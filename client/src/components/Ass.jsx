import React from 'react';
import '../scss/MainEpt.scss'
import Billy from '../assets/img/SexwithBilly.jpg';

export function Ass() {
    const [isVisible, setVisible] = React.useState(false);

    return (
        <div onClick={() => setVisible(!isVisible)} className="sheNePrydumaly">
            <p className={isVisible ? 'inactive' : undefined}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, dicta? Quasi, doloribus amet! Molestias quisquam ex vel quia, facere ipsum a harum illum explicabo minus ipsa corrupti nemo cupiditate culpa ratione adipisci vitae eum recusandae provident? Blanditiis possimus quae voluptatem velit illo ab nulla, qui quia mollitia amet dignissimos nisi excepturi maxime, nesciunt ipsam nostrum consequatur laudantium adipisci iusto eligendi obcaecati beatae distinctio laborum assumenda? A temporibus facere doloribus praesentium fuga maiores sint, vero cum minus, deserunt recusandae similique ducimus tempore molestias perspiciatis inventore aliquid harum. Neque dicta ducimus minus pariatur, ratione quae nam consectetur debitis. Labore accusantium debitis autem.</p>
            <img className={`eighteenplus ${!isVisible ? 'inactive' : undefined}`} style={{ width: "100%", height: "300" }} src={Billy} alt="Gay" />
        </div>
    )
}