import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Pressable,
    Dimensions
} from 'react-native';
import { API_URL } from '../constants/constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pagination } from 'react-native-snap-carousel';
import DahaComponent from '../components/DahaComponents';

// Replace with your actual API URL

const HomeScreen = ({navigation}) => {
    // Refs
    const flatListRef = useRef(null);
    // States
    const [promotions, setPromotions] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const fetchPromotions = async () => {
        const response = await fetch(`${API_URL}/promotions/list?Channel=PWA`, {
            headers: {
                'X-Country-Id': 'TR',
                'X-Language-Id': 'TR', // notice the Bearer before your token
            },
        });

        const data = await response.json();

        setPromotions(data);
    };

    const fetchPromotionsWithTag = async (tagId) =>{
        const response = await fetch(`${API_URL}/promotions/list?Channel=PWA&tagId=${tagId}`, {
            headers: {
                'X-Country-Id': 'TR',
                'X-Language-Id': 'TR', // notice the Bearer before your token
            },
        });

        const data = await response.json();

        return data;
    }

    const onViewableItemsChanged = ({ viewableItems }) => {
        const nextSelectedDotIndex = viewableItems[1]?.index ?? viewableItems[0]?.index ?? 0;

        setActiveSlide(nextSelectedDotIndex);
    };

    const fetchTags = async () => {
        const response = await fetch(`${API_URL}/tags/list`, {
            headers: {
                'X-Country-Id': 'TR',
                'X-Language-Id': 'TR', // notice the Bearer before your token
            },
        });
        const data = await response.json();

        setTags(data);
    }

    const handleTagPress = async (tagId) => {
        const nextSelectedTagsValue = selectedTags == tagId ? null : tagId;
        
        setSelectedTags(nextSelectedTagsValue);
        // Filtrelenmiş promosyonları ayarla
        if (!tagId) {
            // Eğer hiç etiket seçilmemişse tüm promosyonları göster
            fetchPromotions();
        } else {

            const promotionsFilteredWithTag = await fetchPromotionsWithTag(tagId);
            // Seçili etiketlere göre promosyonları filtrele
            setPromotions(promotionsFilteredWithTag ?? []);
        }

        setActiveSlide(0);
        // @ts-ignore
        flatListRef?.current?.scrollToIndex({ animated: true, index: 0 });

    };


    useEffect(() => {
        fetchPromotions();
        fetchTags();
    }, []);

    const renderPromotions = ({ item }) => (
        <TouchableOpacity style={styles.promotionCard} onPress={() => navigation.navigate('CampaignDetail', { 
             SeoName: item.SeoName, Id: item.Id ,
        })}>
            <Image style={styles.promotionImage} source={{ uri: item?.ImageUrl }} />
            {/* <Text style={styles.promotionDescription}>{item.description}</Text> */}
        </TouchableOpacity>
    );

    const renderTags = ({ item, index }) => (
        // <View style={styles.tagButtonContainer}>
        // {index > 0 && <View style={styles.divider} />} 
            <TouchableOpacity style={[
                styles.tagButton,
                { backgroundColor: selectedTags == item.Id ? '#ddd' : '#fff' }
            ]} onPress={() => handleTagPress(item.Id)}>
                <Image
                    source={{ uri: item?.IconUrl }}
                    style={styles.tagIcon}
                    resizeMode="contain"
                />
                <Text style={styles.tagButtonText}>{item.Name}</Text>
            </TouchableOpacity>
        // </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.navbar} >
                <DahaComponent/>
                <View style={styles.spacer} />
                <Pressable style={styles.loginButton}><Text>Giriş Yap</Text></Pressable>
                <Pressable><Ionicons style={styles.userIcon} name="person-circle" size={30} /></Pressable>
            </View>
            <View style={styles.navContainer}>
                <FlatList
                    data={tags}
                    horizontal
                    keyExtractor={(item) => item.Id}
                    renderItem={renderTags}
                />
            </View>
            <FlatList
                horizontal
                ref={flatListRef}
                data={promotions}
                renderItem={renderPromotions}
                keyExtractor={(item) => item.Id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.promotionListContainer}
                onViewableItemsChanged={onViewableItemsChanged}
                
            />
            <View>
                <Pagination
                    activeDotIndex={activeSlide}
                    dotsLength={promotions?.length ?? 0}
                    containerStyle={styles.paginationContainer}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6} />
            </View>
            <View style={styles.tabBarContainer}>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons
                        style={styles.tabIcon}
                        name='compass'
                        size={20}
                    />
                    <Text style={styles.tabTitle}>KEŞFET</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bcontainer}>
                    <View>
                        <View style={[styles.segment2, styles.segmentRed]} />
                        <View style={[styles.segment2, styles.segmentGreen]} />
                        <View style={[styles.segment2, styles.segmentBlue]} />
                        <View style={[styles.segment2, styles.segmentYellow]} />
                    </View>
                    <View style={[styles.segment, styles.segmentVertical, styles.segmentTop]} />
                    <View style={[styles.segment, styles.segmentHorizontal, styles.segmentLeft]} />
                    <View style={[styles.segment, styles.segmentHorizontal, styles.segmentRight]} />
                    <View style={[styles.segment, styles.segmentVertical, styles.segmentBottom]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="star-outline" size={20} />
                    <Text style={styles.tabTitle}>DAHA CÜZDAN</Text>
                </TouchableOpacity>
            </View>

            {/* Join Now component here (fixed in place) */}
            {/* Navigation bar component here (fixed at bottom) */}
        </View>
    );
};
const { width } = Dimensions.get('window') ;
const tabWidth = width 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        paddingTop: 2, // Navbar yüksekliği kadar padding
        // Diğer gerekli stiller
    },
    logo: {
        width: 81,
        height: 40,
        resizeMode: 'contain'
    },
    spacer: {
        flex: 1, // Boşluk elemanını esnek yap
    },
    promotionListContainer: {
        paddingHorizontal: 15, // Liste kenar boşlukları
        // paddingTop: 0, // Liste üst boşluğu
    },
    promotionCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        width: width * 0.9, // Kartın genişliği ekran genişliğinin %90'ı olarak ayarlandı
        elevation: 3, // Android için gölge
        shadowColor: '#000', // iOS için gölge
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        margin: width * 0.05,

    },
    promotionImage: {
        width: '100%', // Resim genişliği
        height: '100%', // Resim yüksekliği
        position: 'absolute',
        resizeMode: 'cover',
    },
    navbar: {
        flexDirection: 'row', // İç elemanları yatay olarak sırala
        justifyContent: 'space-between', // Elemanları dağıt
        alignItems: 'center', // İç elemanları dikeyde ortala
        height: 60, // Navbar yüksekliği
        paddingHorizontal: 15, // Yatay padding
        marginTop: 40, // Üstten boşluk
    },
    brand: {
        width: 455,
        height: 36,
        left: 15,
        top: 100,

    },
    loginButton: {
        backgroundColor: 'red', // Arka plan rengi
        paddingHorizontal: 12, // Yatay iç boşluk
        paddingVertical: 6, // Dikey iç boşluk
        borderRadius: 20, padding: 10,
    },
    userIcon: {
        // Kullanıcı ikonu için stil
        marginLeft: 12, // Sol taraftan boşluk
    },

    brandItem: {
        width: 105,
        height: 36,
        left: 15,
        top: 100,
    },
    tabItem: {
        alignItems: 'center', // İçerikleri dikeyde ortala
    },
    tabItemActive: {
        width: 58, // Düğme genişliği
        height: 58, // Düğme yüksekliği
        borderRadius: 29, // Düğme köşe yuvarlaklığı (yükseklik/2)
        borderWidth: 4, // Çerçeve kalınlığı
        borderColor: '#FF0000', // Kırmızı çerçeve rengi
        justifyContent: 'center', // İçerikleri yatayda ortala
        alignItems: 'center', // İçerikleri dikeyde ortala
        backgroundColor: 'white', // İçerikleri dikeyde ortala
        // Seçili sekme için özel stil
    },

    activeIconContainer: {
        borderWidth: 2, // Çerçeve kalınlığı
        borderColor: 'green', // Çerçeve rengi
        borderRadius: 20, // Çerçeve yuvarlaklığı
        padding: 5, // İç boşluk
        // Diğer stil özellikleri
    },

    tabIcon: {
        width: 24, // İkon genişliği
        height: 24, // İkon yüksekliği
        // İkon için diğer stil ayarlamaları
    },

    tabTitle: {
        fontSize: 12, // Yazı boyutu
        color: '#333333', // Yazı rengi
        // Yazı için diğer stil ayarlamaları
    },

    tabTitleActive: {
        fontSize: 12, // Yazı boyutu
        color: 'green', // Yazı rengi
        fontWeight: 'bold', // Yazı kalınlığı
        // Seçili yazı için diğer stil ayarlamaları
    },
    tabBarContainer: {
        backgroundColor: 'white', // Tab arkaplan rengi
        width: tabWidth,
        height: 60, // Tab yüksekliği
        flexDirection: 'row', // İçerikleri yatay olarak sıralar
        justifyContent: 'space-around', // İçerikleri aralarında eşit şekilde dağıtır
        alignItems: 'center', // İçerikleri dikey olarak ortalar
        shadowColor: '#000', // iOS için gölge rengi
        shadowOffset: { width: 0, height: 10 }, // iOS için gölge yönü
        shadowOpacity: 0.1, // iOS için gölge opaklığı
        shadowRadius: 10, // iOS için gölge yayılma yarıçapı
        elevation: 5, // Tab bar arka plan rengi
        borderTopRightRadius: 20, // Üst sağ köşe yuvarlaklığı
        borderTopLeftRadius: 20, // Üst sol köşe yuvarlaklığı
        // Gölgelendirme ve diğer stil özellikleri eklenebilir
    },

    bcontainer: {
        width: 70, // Butonun genel genişliği
        height: 70, // Butonun genel yüksekliği
        borderRadius: 20, // Butonun köşe yuvarlaklığı
        borderWidth: 3, // Dış çerçevenin kalınlığı
        borderColor: '#FF4136', // Dış çerçevenin rengi
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 5, // Dış çerçeve ve artı işareti arasında boşluk sağlar // Butonun arka plan rengi
    },
    segment: {
        position: 'absolute',
        backgroundColor: 'black', // Ögelerin arka plan rengi, bu örnekte siyah olarak belirlendi
    },
    segmentVertical: {
        width: 15, // Dikey ögelerin genişliği
        height: 15,
        // Dikey ögelerin yüksekliği
    },
    segmentHorizontal: {
        width: 15, // Yatay ögelerin genişliği
        height: 15, // Yatay ögelerin yüksekliği

    },
    segmentTop: {
        top: 12, // En üstteki öge için konumlandırma
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 3,
        backgroundColor: "#009639"
    },
    segmentBottom: {
        bottom: 12, // En alttaki öge için konumlandırma
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "#FF8300",
        borderWidth: 3,
    },
    segmentLeft: {
        left: 12, // Soldaki öge için konumlandırma
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 3,
        backgroundColor: "#F40000"
    },
    segmentRight: {
        right: 12, // Sağdaki öge için konumlandırma
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#1D1E1C",
        borderWidth: 3,
        backgroundColor: "#F1DE02"
    },
    segment2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20, // Yarıçapı, container genişliğinin yarısı kadar olmalıdır
        borderWidth: 2, // Genişliği, istenen dış çerçeve kalınlığına göre ayarlayın
    },
    segmentRed: {
        borderColor: 'red',
        transform: [{ rotate: '45deg' }], // Her bir segmenti farklı açılarda döndür
    },
    segmentGreen: {
        borderColor: 'green',
        transform: [{ rotate: '135deg' }],
    },
    segmentBlue: {
        borderColor: 'blue',
        transform: [{ rotate: '225deg' }],
    },
    segmentYellow: {
        borderColor: 'yellow',
        transform: [{ rotate: '315deg' }],
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff', // Or any other color
        paddingVertical: 10, // Adjust as needed
    },

    tagButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8, // veya butonlarınızın boyutuna göre ayarlayın
        // backgroundColor: '#fff', // buton arka plan rengi
        borderRadius: 8,
        borderWidth:1, // buton köşe yuvarlaklığı
        margin: 4, // butonlar arası boşluk
    }, // Adjust the spacing between buttons as needed
    tagIcon: {
        width: 20, // ikon genişliği, boyutlarınıza göre ayarlayın
        height: 20, // ikon yüksekliği, boyutlarınıza göre ayarlayın
        marginRight: 8, // ikon ve metin arası boşluk
      },
      tagButtonText: {
        fontSize: 14, // metin boyutu, boyutlarınıza göre ayarlayın
        color: '#333', // metin rengi, görselinize uygun bir renk seçin
      },
    icon: {
        width: 30, // Adjust the size as needed
        height: 30, // Adjust the size as needed
    },
    buttonText: {
        marginTop: 5,
        fontSize: 12,
        color: '#000', // Adjust text color as needed
    },
    paginationContainer: {
        position: 'absolute',
        bottom: -25, // Carousel altında yer alacak şekilde ayarlayın
        left: 0,
        right: 0,
    },
    divider: {
        height: '100%', // bölücü yüksekliği
        width: 1, // bölücü genişliği
        backgroundColor: '#ddd', // bölücü rengi, görselinize uygun bir renk seçin
      },
    // Add more styles here
});

export default HomeScreen;
/* BG_Shape */

