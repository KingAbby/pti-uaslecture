import "../MovieDesc/Movie.css";
import BTPOT from '../Images/btpot.jpg';

const BT = () => {
    return (
        <>
        <div>
        <ul id="nav">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <li><a href="/">Home</a></li>
            <li><a href="Index.js">Halaman Utama</a></li>
            <li>
                <select>
                    <option>Genre</option>
                    <option>Action</option>
                    <option>Adventure</option>
                    <option>Biography</option>
                    <option>Comedy</option>
                    <option>Crime</option>
                    <option>Drama</option>
                    <option>Fantasy</option>
                    <option>Horror</option>
                    <option>Mystery</option>
                    <option>Romance</option>
                    <option>Sci-Fi</option>
                    <option>Sport</option>
                    <option>Thriller</option>
                </select>
            </li>
        </ul>
    </div>
<div class="title">
    <h2>Movie Information</h2>
</div>
    
    <section id="info">
        <div class="movie">
            <img src={BTPOT} style={{width:"100%"}} />
            <h3>Bullet Train</h3>
            <h5>Movie</h5>
            <h6>2022</h6>
        </div>
        <div class="desc">
            <div class="movie-overview">
                <iframe id="overview" width="800" height="800" src="https://www.youtube.com/embed/0IOsk2Vlc4o"></iframe>
            </div>
            <h4>Synopsis</h4>
            <h5>Five assassins aboard a swiftly-moving bullet train find out that their missions have something in common.</h5>
            <table>
                <tr>
                    <td>Producer</td>
                    <td>: Kelly McCormick, David Leitch, Antoine Fuqua</td>
                </tr>
                <tr>
                    <td>Director</td>
                    <td>: David Leitch</td>
                </tr>
                <tr>
                    <td>Writer</td>
                    <td>: Zak Olkewicz, Kôtarô Isaka</td>
                </tr>
                <tr>
                    <td>Casts</td>
                    <td>: Brad Pitt, Joey King, Aaron Taylor-Johnson, Brian Tyree Henry, Andrew Koji, Hiroyuki Sanada, </td>
                </tr>
                <tr>
                    <td></td>
                    <td>Michael Shannon, Sandra Bullock, Bad Bunny, Logan Lerman, Zazie Beetz, Masi Oka, Karen Fukuhara, Kevin Akiyoshi Ching, Minchi Murakami, Kaori Taketani, Toshitaka Katsumi, Jim Garrity</td>
                </tr>
            </table>
        </div>
    </section>
    <div class="title">
        <h4>Genre:</h4>
    </div>
    <div class="genre">
        <a href="../Genres/Action.html">Action</a>
        <a href="../Genres/Comedy.html">Comedy</a>
        <a href="../Genres/Thriller.html">Thriller</a>
    </div>
        </>
    );
}

export default BT;